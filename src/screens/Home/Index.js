import {StyleSheet, View, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Layout, Colors} from '../../theme';
import Tweet from './Tweet';
import {simpleGetApidWithTokenAndParams} from '../../config/SimpleApiCall';
import {get_timeline_data} from '../../config/WebServices';
import {concat} from 'lodash';
import {useAuthStore} from '../../zustand';
import {Loader} from '../../components';
const Index = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [loader, setLoader] = useState(false);
  const [totalPages, setTotalPages] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const token = useAuthStore(state => state.token);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoader(true);
    let url = get_timeline_data;
    let params = {
      page: currentPage,
    };

    try {
      const res = await simpleGetApidWithTokenAndParams({
        url,
        token,
        params,
      });
      console.log('response fetch data====', res);
      if (res && res?.data?.length > 0) {
        setPosts(res?.data);
        setTotalPages(res?.totalPages);
        setLoader(false);
      }
    } catch (error) {
      console.log('error fetch data==', error);
      setLoader(false);
    }
  };

  const loadMoreData = async () => {
    setLoadMore(true);
    let newPage = currentPage + 1;
    let url = get_timeline_data;
    let params = {
      page: newPage,
    };
    setCurrentPage(newPage);
    try {
      const res = await simpleGetApidWithTokenAndParams({
        url,
        token,
        params,
      });
      console.log('response Load more====', res);
      if (res && res?.data?.length > 0) {
        setPosts(items => [...concat(items, res.data)]);
        setLoadMore(false);
      }
    } catch (error) {
      console.log('error Load more==', error);
      setLoadMore(false);
    }
  };

  const renderPosts = ({item, index}) => {
    return <Tweet key={item?.id} item={item} id={item?.id} />;
  };

  const renderFooter = () => {
    return <Loader />;
  };

  return (
    <View style={styles.mainContainer}>
      {loader && <Loader />}
      <FlatList
        data={posts}
        onEndReachedThreshold={0.01}
        onEndReached={({distanceFromEnd}) => {
          if (currentPage < totalPages) {
            loadMoreData();
          }
        }}
        ListFooterComponent={loadMore ? renderFooter : ''}
        renderItem={renderPosts}
        keyExtractor={item => item.id.toString()}
      />
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
});
