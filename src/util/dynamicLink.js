import firebase from '@react-native-firebase/app';

export  const  dynamicEventLink = async (id, groupId) => {
    const link = new firebase.links.DynamicLink(
        encodeURI(`https://nt66leppi.page.link/${id}/${groupId}`),
        'https://nt66leppi.page.link'
    ).android.setPackageName('app_android_bundle_id');
    // .ios.setBundleId('app_ios_bundle_id');

    const dymcLink = await firebase.links()
        .createShortDynamicLink(link, `UNGUESSABLE`)
        .then((url) => decodeURIComponent(url));
    return dymcLink;
};
