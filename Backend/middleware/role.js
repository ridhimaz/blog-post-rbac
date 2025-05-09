const mongoose = require('mongoose');
const User = require('../models/User');
const Module = require('../models/Module');
const Permission = require('../models/Permission');
const constants = require('../constants/constants');

async function getUserRoleById(userId) {
  try {
    const user = await User.findById(userId).select('role_id');
    if (!user) {
      console.log('User not found');
      return null;
    }
    console.log('Role_id:', user.role_id);
    return user.role_id;
  } catch (error) {
    console.error('Error fetching role:', error);
    return null;
  }
}

async function getModuleIdFromKey(key) {
  // console.log("key", key);
  try {
    const moduleDoc = await Module.findOne({ module_key: key }).select('_id');
    if (!moduleDoc) {
      console.error('module ');
      return null;
    }
    // console.log(moduleDoc._id)
    return moduleDoc._id;
  } catch (error) {
    console.error('DB error:', error);
    return null;
  }
}

async function getPermission(moduleId, roleId) {
  try {
    const permission = await Permission.findOne({
      module_id: moduleId,
      role_id: roleId
    });
    if (!permission) {
      console.log('Permission not found');
      return null;
    }
    // console.log('Permission:', permission);
    return permission.permission;
  } catch (error) {
    console.error('Error fetching permission:', error);
    return null;
  }
}

module.exports = async function (req, res, next) {

  const method = req.method;
  const allowedMethods = ['GET', 'POST', 'PATCH', 'DELETE'];
  if (!allowedMethods.includes(method)) {
    return res.status(405).json({ error: `HTTP method ${req.method} not allowed.` });
  }
  const path = req.originalUrl;
  const parts = path.split('/');
  const moduleKey = parts[2];
  //console.log("mk",moduleKey);
  const roleId = await getUserRoleById(req.user.id);
  const moduleId = await getModuleIdFromKey(moduleKey);
  const permission = await getPermission(moduleId, roleId);
  const tempPermission = parseInt(permission, 10);
  const permissionValue = constants[method];
  
  if ((permissionValue & tempPermission) === 0) {
    //console.log("p", tempPermission, "pv", permissionValue);
    return res.status(403).json({ error: 'Access denied: insufficient permissions.' });
  }
  else console.log("Permission granted!");
  next();
}