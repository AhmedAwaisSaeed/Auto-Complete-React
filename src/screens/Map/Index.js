import {StyleSheet, View, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {Images, Layout, Colors} from '../../theme';
import {get_place_details_api, token} from '../../config/WebServices';
import {simpleApiGetWithParams} from '../../config/SimpleApiCall';
import {Loader} from '../../components';

const Index = ({route}) => {
  const place_id = route?.params?.place_id;

  const [mapReady, setMapReady] = useState(false);
  const [loader, setLoader] = useState(false);
  const [placeGeometry, setPlaceGeometry] = useState(undefined);

  useEffect(() => {
    setLoader(true);
    getLatLongOfPlace();
  }, []);

  const getLatLongOfPlace = async () => {
    let url = get_place_details_api;
    let params = {
      place_id: place_id,
      key: token,
    };
    try {
      let response = await simpleApiGetWithParams({url, params});
      if (response.status === 'OK') {
        console.log('response get details of place==', response);
        setPlaceGeometry(response?.result?.geometry);
        setLoader(false);
        setMapReady(true);
      } else {
        console.log('error response of get details place==', response);
        setLoader(false);
      }
    } catch (error) {
      console.log('error response of get details place==', error);
      setLoader(false);
    }
  };

  return (
    <View style={styles.flexOne}>
      <View style={styles.container}>
        {loader ? (
          <Loader />
        ) : (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: placeGeometry?.location.lat,
              longitude: placeGeometry?.location.lng,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            onMapReady={setMapReady}>
            <Marker
              coordinate={{
                latitude: placeGeometry?.location?.lat,
                longitude: placeGeometry?.location?.lng,
              }}>
              <View style={styles.markerContainer}>
                <Image source={Images.markerIcon} style={styles.pinStyle} />
              </View>
            </Marker>
          </MapView>
        )}
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  flexOne: {
    flex: 1,
  },
  markerContainer: {
    width: Layout.SV_25,
    height: Layout.SV_25,
    borderWidth: 1,
    borderColor: Colors.Primary.Light_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Primary.WHITE,
    borderRadius: Layout.SV_5,
  },
  pinStyle: {
    width: Layout.SV_15,
    height: Layout.SV_15,
    resizeMode: 'contain',
  },
  secondSection: {
    flex: 1,
    marginTop: Layout.SV_30,
  },
  rowContainer: {
    flexDirection: 'row',
    marginVertical: Layout.SV_20,
  },
});
