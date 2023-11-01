import React, { memo } from 'react';
import { View, Text, Image } from '@gluestack-ui/themed';
import { TouchableOpacity } from 'react-native';
import { getImageUrl } from 'helpers/index';
import { ComicsType } from 'types/ComicType';

interface ICharacterCardtProps {
  comic: ComicsType;
  onPress: () => void;
}

const Component: React.FC<ICharacterCardtProps> = ({ comic, onPress }) => {
  return (
    <TouchableOpacity
      style={{ flex: 1, alignItems: 'center' }}
      onPress={onPress}
    >
      <View marginBottom={35} alignItems="center" maxWidth={150}>
        <Image
          source={{ uri: getImageUrl(comic.thumbnail) }}
          alt={comic.title}
          width={150}
          height={180}
        />

        <Text color="white" textAlign="center" bold fontSize="$xs">
          {comic.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(Component);
