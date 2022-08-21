import TextInput from '../../components/TextInput';

const React = require('react');
const { View, Text } = require('react-native');
const { Button } = require('react-native-paper');

export default function SearchTimeTable({ navigation }) {
  return (
    <View style={{ flex: 1 }} className="p-8">
      <Text className="text-2xl mb-6 text-center">Search Time Table</Text>
      <TextInput label="From" errorText={''} />
      <TextInput
        label="Date"
        placeholder="Date (Leave blank for today)"
        errorText={''}
      />
      <Button
        mode="contained"
        onPress={() => navigation.navigate('StationSchedule')}
        className="mt-4"
      >
        View Time Table
      </Button>
    </View>
  );
}
