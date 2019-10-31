import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

export const checkLocationAlways = () => {
    check(PERMISSIONS.IOS.LOCATION_ALWAYS)
        .then(result => {
            switch (result) {
            case RESULTS.UNAVAILABLE:
                console.log('checkLocationAlways is not available (on this device / in this context)');
                break;
            case RESULTS.DENIED:
                console.log('checkLocationAlways has not been requested / is denied but requestable');
                request(PERMISSIONS.IOS.LOCATION_ALWAYS).then(result => {
                    // …
                    console.log('LOCATION_ALWAYS', result);
                  });
                break;
            case RESULTS.GRANTED:
                console.log('checkLocationAlways is granted');
                break;
            case RESULTS.BLOCKED:
                console.log('checkLocationAlways is denied and not requestable anymore');
                break;
            }
        })
  .catch(error => {
    // …
  });
}

export const checkLocationWhenInUse = () => {
    check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        .then(result => {
            switch (result) {
            case RESULTS.UNAVAILABLE:
                console.log('LOCATION_WHEN_IN_USE is not available (on this device / in this context)');
                break;
            case RESULTS.DENIED:
                console.log('LOCATION_WHEN_IN_USE has not been requested / is denied but requestable');
                request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
                    // …
                    console.log('LOCATION_WHEN_IN_USE', result);
                  });
                break;
            case RESULTS.GRANTED:
                console.log('LOCATION_WHEN_IN_USE is granted');
                break;
            case RESULTS.BLOCKED:
                console.log('LOCATION_WHEN_IN_USE is denied and not requestable anymore');
                break;
            }
        })
  .catch(error => {
    // …
  });
}

export const checkCamera = () => {
    check(PERMISSIONS.IOS.CAMERA)
        .then(result => {
            switch (result) {
            case RESULTS.UNAVAILABLE:
                console.log('CAMERA is not available (on this device / in this context)');
                break;
            case RESULTS.DENIED:
                console.log('CAMERA has not been requested / is denied but requestable');
                request(PERMISSIONS.IOS.CAMERA).then(result => {
                    // …
                    console.log('CAMERA', result);
                  });
                break;
            case RESULTS.GRANTED:
                console.log('CAMERA is granted');
                break;
            case RESULTS.BLOCKED:
                console.log('CAMERA is denied and not requestable anymore');
                break;
            }
        })
  .catch(error => {
    // …
  });
}

export const checkMediaLibrary = () => {
    check(PERMISSIONS.IOS.MEDIA_LIBRARY)
        .then(result => {
            switch (result) {
            case RESULTS.UNAVAILABLE:
                console.log('MEDIA_LIBRARY is not available (on this device / in this context)');
                break;
            case RESULTS.DENIED:
                console.log('MEDIA_LIBRARY has not been requested / is denied but requestable');
                request(PERMISSIONS.IOS.MEDIA_LIBRARY).then(result => {
                    // …
                    console.log('MEDIA_LIBRARY', result);
                  });
                break;
            case RESULTS.GRANTED:
                console.log('MEDIA_LIBRARY is granted');
                break;
            case RESULTS.BLOCKED:
                console.log('MEDIA_LIBRARY is denied and not requestable anymore');
                break;
            }
        })
  .catch(error => {
    // …
  });
}

export const checkPhotoLibrary = () => {
    check(PERMISSIONS.IOS.PHOTO_LIBRARY)
        .then(result => {
            switch (result) {
            case RESULTS.UNAVAILABLE:
                console.log('PHOTO_LIBRARY is not available (on this device / in this context)');
                break;
            case RESULTS.DENIED:
                console.log('PHOTO_LIBRARY has not been requested / is denied but requestable');
                request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(result => {
                    // …
                    console.log('PHOTO_LIBRARY', result);
                  });
                break;
            case RESULTS.GRANTED:
                console.log('PHOTO_LIBRARY is granted');
                break;
            case RESULTS.BLOCKED:
                console.log('PHOTO_LIBRARY is denied and not requestable anymore');
                break;
            }
        })
  .catch(error => {
    // …
  });
}
