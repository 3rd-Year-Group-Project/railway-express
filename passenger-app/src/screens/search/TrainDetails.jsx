import React from 'react';

import { View, ScrollView, Image } from 'react-native';
// @ts-ignore
import TrainSchedule from '../../../assets/images/train_schedule.jpg';

export default function TrainDetails({ navigation }) {
  return (
    <>
      <ScrollView
        style={{
          backgroundColor: '#F4F4F6',
        }}
      >
        <View
          className="flex-1 items-center mb-2 mt-8"
          style={{ minHeight: 600, minWidth: '100%' }}
        >
          <Image
            source={TrainSchedule}
            style={{ height: '100%', width: '100%' }}
          />
        </View>
      </ScrollView>
    </>
  );
}
