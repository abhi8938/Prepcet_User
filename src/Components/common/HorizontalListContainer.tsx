import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {FunctionComponent} from 'react';

import ViewAll from './ViewAll';
import theme from '../../Constants/theme';

type props = {
  heading: string;
  children?: any;
  onViewAll?: () => void;
};
const HorizontalListContainer: FunctionComponent<props> = ({
  heading,
  children,
  onViewAll,
}) => {
  return (
    <View style={styles.subjectContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingRight: theme.SIZES.small,
          alignItems: 'center',
        }}>
        <Text style={styles.horizontalListTitle}>{heading}</Text>
        {onViewAll && <ViewAll onPress={onViewAll} />}
      </View>
      {children}
    </View>
  );
};

export default HorizontalListContainer;

const styles = StyleSheet.create({
  subjectContainer: {
    paddingVertical: theme.SIZES.small + 1,
    paddingLeft: theme.SIZES.small,
    paddingRight: 2,
    borderBottomColor: `${theme.COLORS.HEADER}`,
    borderBottomWidth: 0.5,
  },
  horizontalListTitle: {
    fontSize: theme.SIZES.large * 1.5,
    fontFamily: 'ComicNeue-Bold',
    alignSelf: 'flex-start',
    color: theme.COLORS.BORDER_COLOR,
    marginBottom: theme.SIZES.small,
  },
});
