import {StyleSheet, View, FlatList, Text} from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';
import {Layout, Colors} from '../../theme';
import SearchBar from '@ant-design/react-native/lib/search-bar';
import {useDispatch, useSelector} from 'react-redux';
import {_getAllPrecitions} from '../../store/actions';
import _ from 'lodash';
import Prediction from './Prediction';
const Index = ({navigation}) => {
  const dispatch = useDispatch();
  const allPredictions = useSelector(
    state => state.PredictionsReducer.allPredictions,
  );

  const [query, setQuery] = useState('');

  const onChange = text => {
    setQuery(text);
  };
  const clearQuery = () => {
    setQuery('');
  };

  const handler = useMemo(
    () => _.debounce(() => fetchPredictions(), 200),
    [query],
  );

  useEffect(() => {
    handler();
    return () => {
      handler.cancel();
    };
  }, [query]);

  const fetchPredictions = () => {
    dispatch(
      _getAllPrecitions({
        query: query,
      }),
    );
  };

  const onPressAddress = item => {
    navigation.navigate('Map', {
      place_id: item.place_id,
    });
  };

  const renderPrediction = ({item, index}) => {
    return (
      <Prediction
        key={item.place_id}
        item={item}
        index={index}
        onPressAddress={onPressAddress}
      />
    );
  };

  return (
    <View style={styles.mainContainer}>
      <SearchBar
        value={query}
        placeholder="Search Location"
        onCancel={clearQuery}
        onChange={onChange}
        cancelText={'Cancel'}
      />
      <View style={styles.listContainer}>
        <FlatList
          data={allPredictions}
          renderItem={renderPrediction}
          keyExtractor={item => item.place_id.toString()}
        />
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: Layout.SV_10,
    backgroundColor: Colors.Primary.WHITE,
    paddingVertical: Layout.SV_20,
  },
  listContainer: {
    flex: 1,
    backgroundColor: Colors.Primary.GREY_1,
  },
});
