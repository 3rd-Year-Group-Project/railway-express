import { Formik } from 'formik';
import React, { useState } from 'react';
import * as yup from 'yup';
import TextInput from '../../components/TextInput';

import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { Button, IconButton, Snackbar } from 'react-native-paper';
import { theme } from '../../../reactNativePaperTheme';
// @ts-ignore
import UndrawSubway from '../../../assets/images/undraw_subway.png';

const loginValidationSchema = yup.object().shape({
  from: yup
    .string()
    .min(3, ({ min }) => `Must be at least ${min} characters`)
    .required('Required!'),
  to: yup
    .string()
    .min(3, ({ min }) => `Must be at least ${min} characters`)
    .required('Required!'),
});

export default function SearchTrains({ navigation }) {
  const [loginError, setLoginError] = useState(null);

  setTimeout(() => {
    navigation.navigate('SearchResults');
  }, 100);

  async function handleLoginSubmit(values, { setSubmitting }) {
    setLoginError(null);
    setTimeout(() => {
      navigation.navigate('SearchResults', values);
    }, 100);
    setSubmitting(false);
  }

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: '#F4F4F6',
        }}
      >
        <View
          className="flex-1 items-center mb-2"
          style={{ minHeight: '130%', minWidth: '100%' }}
        >
          <Image
            source={UndrawSubway}
            style={{ height: '100%', width: '100%' }}
          />
        </View>

        <KeyboardAvoidingView className="flex-1 items-center ml-12 mr-16">
          {/* <Text className="text-3xl font-normal mb-4">Search Trains</Text> */}
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ from: '', to: '' }}
            onSubmit={handleLoginSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
              isSubmitting,
              touched,
            }) => (
              <>
                <TextInput
                  name="from"
                  label="From"
                  onChangeText={handleChange('from')}
                  onBlur={handleBlur('from')}
                  value={values.from}
                  errorText={touched.from ? errors.from : null}
                />
                <View className="w-full relative">
                  <TextInput
                    name="to"
                    label="To"
                    onChangeText={handleChange('to')}
                    onBlur={handleBlur('to')}
                    value={values.to}
                    errorText={touched.to ? errors.to : null}
                  />
                  <IconButton
                    icon="cached"
                    iconColor={theme.colors.primary}
                    size={30}
                    onPress={() => console.log('Pressed')}
                    className="absolute -top-6 -right-12"
                  />
                </View>

                <Button
                  mode="contained"
                  className="mt-4"
                  onPress={handleSubmit}
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                >
                  Search
                </Button>
              </>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </ScrollView>
      <Snackbar
        visible={Boolean(loginError)}
        onDismiss={() => setLoginError(null)}
        action={{
          label: 'Close',
          onPress: () => setLoginError(null),
        }}
        style={{ backgroundColor: theme.colors.error }}
      >
        {loginError}
      </Snackbar>
    </>
  );
}
