import {StyleSheet, View} from 'react-native';
import React, {useState, useEffect, useCallback, useRef} from 'react';
import {Layout, Colors, Images} from '../../theme';
import {Avatar, SimpleText, Icon} from './components';
import {simpleApiPostWithToken} from '../../config/SimpleApiCall';
import {post_like_api, post_dislike_api} from '../../config/WebServices';
import {useAuthStore} from '../../zustand';
const Tweet = ({item, id}) => {
  const firstRender = useRef(true);
  const token = useAuthStore(state => state.token);
  const firstName = item?.user?.first_name;
  const lastName = item?.user?.last_name;
  const avatarURL = item?.user?.profile_image_url;
  const text = item?.text;
  const repliesCount = item?.replies_count;

  const [pressedHeart, setPressedHeart] = useState(undefined);
  const [likesCount, setLikesCount] = useState(item?.likes_count);

  const onPressHeartIcon = () => {
    firstRender.current = false;
    setPressedHeart(!pressedHeart);
  };

  useEffect(() => {
    if (!firstRender.current) {
      if (pressedHeart) {
        setLikesCount(likesCount + 1);
        hitLikeApi();
      } else {
        setLikesCount(likesCount - 1);
        hitDislikeApi();
      }
    }
  }, [pressedHeart]);

  const hitLikeApi = useCallback(async () => {
    let url = `${post_like_api}`;
    let formData = new FormData();
    formData.append('post_id', id);
    try {
      const res = await simpleApiPostWithToken(url, formData, token);
      if (res?.status === 200) {
        console.log('response like api====', res);
      }
    } catch (error) {
      console.log('error==', error);
    }
  }, [id]);

  const hitDislikeApi = useCallback(async () => {
    let url = `${post_dislike_api}`;
    let formData = new FormData();
    formData.append('post_id', id);
    try {
      const res = await simpleApiPostWithToken(url, formData, token);
      if (res?.status === 200) {
        console.log('response dislike api====', res);
      }
    } catch (error) {
      console.log('error==', error);
    }
  }, [id]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.rowStyle}>
        <Avatar avatarURL={avatarURL} />
        <SimpleText firstName={firstName} lastName={lastName} text={text} />
      </View>
      <View style={styles.BottomIconsRow}>
        <Icon
          iconName={Images.replyIcon}
          countValue={99}
          count={repliesCount}
        />
        <Icon
          iconName={pressedHeart ? Images.likeIcon : Images.dislikeIcon}
          countValue={1000}
          setPressedHeart={onPressHeartIcon}
          pressedHeart={pressedHeart}
          count={likesCount}
          heart={true}
        />
      </View>
    </View>
  );
};

export default Tweet;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: Layout.SV_10,
    backgroundColor: Colors.Primary.WHITE,
  },

  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  BottomIconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: Layout.SV_10,
    alignItems: 'center',
  },
});
