import React, { memo } from 'react';
import { View, Text } from '@gluestack-ui/themed';
import { TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { getImageUrl } from 'helpers/index';
import { CharacterType } from 'types/CharacterType';

interface ICharacterCardtProps {
  character: CharacterType;
  onPress: () => void;
}

const Component: React.FC<ICharacterCardtProps> = ({ character, onPress }) => {
  const stylesBgImage = StyleSheet.create({
    image: {
      justifyContent: 'flex-end',
      width: 150,
      height: 180,
    },
  });
  return (
    <TouchableOpacity
      style={{ flex: 1, alignItems: 'center' }}
      onPress={onPress}
    >
      <View marginBottom={18} alignItems="center" maxWidth={150}>
        <ImageBackground
          source={{ uri: getImageUrl(character.thumbnail) }}
          alt={character.name}
          style={stylesBgImage.image}
        >
          <Text
            color="white"
            bold
            bg="rgba(170, 0, 0, 0.7)"
            textAlign="center"
            paddingVertical={5}
          >
            {character.name}
          </Text>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default memo(Component);
