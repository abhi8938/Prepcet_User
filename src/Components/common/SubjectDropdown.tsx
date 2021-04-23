import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FunctionComponent, useEffect, useState} from 'react';

import Icon from './Icon';
import {ScrollView} from 'react-native-gesture-handler';
import baseStyles from './styles';
import theme from '../../Constants/theme';
import {useGlobalState} from '../../State/GlobalState';

type props = {};
const SubjectDropdown: FunctionComponent<props> = () => {
  const {subject} = useGlobalState();
  const [ShowSubjects, setShowSubjects] = useState(false);
  return (
    <View>
      <View style={styles.parent}>
        <TouchableOpacity
          style={styles.header}
          onPress={() => setShowSubjects(!ShowSubjects)}>
          <Text style={baseStyles.text}>Select Subject</Text>
          <Icon
            type={ShowSubjects === false ? 'ARROW_BOTTOM' : 'ARROW_TOP'}
            size={0.7}
          />
        </TouchableOpacity>
      </View>
      {ShowSubjects && (
        <View style={styles.parent}>
          <ScrollView>
            {subject.map((item: any, index: number) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.header,
                  {
                    marginBottom: theme.SIZES.small / 1.5,
                    justifyContent: 'center',
                  },
                ]}>
                <Text style={baseStyles.text}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default SubjectDropdown;

const styles = StyleSheet.create({
  parent: {
    marginTop: theme.SIZES.small,
    paddingHorizontal: theme.SIZES.small,
  },
  header: {
    flexDirection: 'row',
    padding: theme.SIZES.small / 1.5,
    justifyContent: 'space-between',
    width: '100%',
    borderColor: theme.COLORS.HEADER,
    borderWidth: 1,
    borderRadius: 10,
  },
});
