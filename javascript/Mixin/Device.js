import required from '../Config/required.js'
export default class Device {
  static getType(val) {
    switch (val) {
      case 1:
      case 2:
        return 'pc'
      case 3:
        return 'ipad'
      case 4:
        return 'printer'
      case 5:
        return 'camera'
      case 6:
        return 'sign'
      case 7:
        return 'clock'
    }
  }

  static profileReady(device) {
    const dtype = this.getType(device.device_type_id)
    const profile = required[dtype].profile
    let dataExists = false
    profile.forEach(function (value) {
      if (device[value] !== undefined && device[value].length > 0) {
        dataExists = true
      }
    }.bind(this))
    return dataExists
  }

  static collectRequired(device) {
    const allRequired = required.allRequired
    const {unassigned, assigned, user} = required[this.getType(device.device_type_id)]
    let errorChecks
    errorChecks = allRequired.concat(unassigned)
    if (device.status === '1' || device.status === '2') {
      errorChecks = errorChecks.concat(assigned)
      if (device.status === '1') {
        errorChecks = errorChecks.concat(user)
      }
    }
    return errorChecks
  }

  static checkForErrors(device, errors) {
    const errorChecks = this.collectRequired(device)
    let errorFound = false
    let foundIndex = -1
    errorChecks.forEach(function (item) {
      foundIndex = errors.indexOf(item)
      if (device[item] === undefined || device[item] === null || device[item].length === 0) {
        errorFound = true
        if (foundIndex > -1) {
          errors.push(item)
        }
      } else {
        if (foundIndex > -1) {
          errors.splice(foundIndex, 1)
        }
      }
    }.bind(this))
    return !errorFound
  }

  static isRequired(device, spec) {
    /*
    * 0 unassigned
    * 1 assigned person
    * 2 assigned location
    * 3 surplus
    */
    const deviceType = this.getType(device.device_type_id)
    const unassigned = required[deviceType].unassigned.indexOf(spec) !== -1
    const allRequired = required.allRequired.indexOf(spec) !== -1

    if (unassigned || allRequired) {
      return true
    } else if ((device.status === '2' || device.status === '1') && required[deviceType].assigned.indexOf(spec) !== -1) {
      return true
    } else if (device.status === '1' && required[deviceType].user.indexOf(spec) !== -1) {
      return true
    } else {
      return false
    }
  }
}
