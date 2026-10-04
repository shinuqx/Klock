import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Modal,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useTheme from './themeHook';
import { useKeepAwake } from '@sayem314/react-native-keep-awake';

// import Animated from "react-native-reanimated";
// import ColorPallete from './colorPicker';
// import { ColorPicker } from 'react-native-color-picker';

// const TimeFormat = true;
const TimeBgColor = 'rgb(19, 206, 91)';
const DateBgColor = '#b71111';
const BgColor = '#250909';

const Clock = () => {
  const { width, height } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [timeBgColor, setTimeBgColor] = useState(TimeBgColor);
  const [dateBgColor, setDateBgColor] = useState(DateBgColor);
  const [bgColor, setBgColor] = useState(BgColor);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 15000);
    return () => clearInterval(timer);
  }, []);
  useKeepAwake();

  const isPortrait = height >= width;
  const responsiveDateFontSize = width * (isPortrait ? 0.1 : 0.08);
  const responsiveTimeFontSize = width * (isPortrait ? 0.4 : 0.45);

  const dateString = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(time);

  const weekDayString = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
  }).format(time);

  const ChangeTheme = (theme: string) => {
    const { bgColor: backgroundColor, timeColor, dateColor } = useTheme(theme);
    setDateBgColor(dateColor);
    setTimeBgColor(timeColor);
    setBgColor(backgroundColor);
    setModalVisible(!modalVisible);
  };
  return (
    <View style={[styles.clockbgContainer, { backgroundColor: `${bgColor}` }]}>
      <View style={styles.dateTextContainer}>
        <View style={{ flex: 1, alignContent: 'flex-start' }}>
          <Text
            style={[
              {
                color: `${dateBgColor}`,
                fontFamily: 'TechnologyBoldItalic',
                fontSize: responsiveDateFontSize,
              },
            ]}
          >
            {weekDayString},
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text
            style={[
              {
                color: `${dateBgColor}`,
                fontFamily: 'TechnologyBoldItalic',
                fontSize: responsiveDateFontSize,
              },
            ]}
          >
            {dateString}
          </Text>
        </View>
      </View>
      <View style={styles.timeContainer}>
        <View style={styles.timeTextContainer}>
          <Text
            style={[
              {
                color: `${timeBgColor}`,
                fontFamily: 'TechnologyBoldItalic',
                fontSize: responsiveTimeFontSize,
              },
            ]}
          >
            {time.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })}
          </Text>
        </View>
        <View style={styles.settingContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="settings-outline" size={30} color="#991923" />
          </TouchableOpacity>
        </View>
      </View>
      {/* // MODAL WINDOW CODE */}
      <Modal
        animationType="fade" // Options: 'none', 'slide', 'fade'
        transparent={true} // Makes the background translucent
        visible={modalVisible} // Controlled by state
        onRequestClose={() => {
          // Required for Android hardware back button
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Text style={styles.headerText}>Select Theme</Text>
            </View>
            <View style={styles.bulletContainer}>
              {/* <View style={styles.bulletView}>
              <Pressable
                style={styles.settingsText}
                onPress={() => { setTimeBgColor('orange'); setModalVisible(!modalVisible) }}>
                <Ionicons name="settings" size={15} color="#991923" />
                <Text style={styles.modalText}>Background Color</Text>
              </Pressable>
            </View> */}

              {/* <View style={styles.bulletView}>
              <Pressable
                style={styles.settingsText}
                onPress={() => { setDateBgColor('orange'); setModalVisible(!modalVisible); }}>
                <Ionicons name="settings" size={15} color="#991923" />
                <Text style={styles.modalText}>Text Color</Text>
              </Pressable>
            </View> */}

              <View style={styles.bulletView}>
                <Pressable
                  style={styles.settingsText}
                  onPress={() => ChangeTheme('1')}
                >
                  <Ionicons name="color-palette" size={25} color="#171717">
                    <Text>Dark</Text>
                  </Ionicons>
                </Pressable>

                <Pressable
                  style={styles.settingsText}
                  onPress={() => ChangeTheme('2')}
                >
                  <Ionicons name="color-palette" size={25} color="#48d421">
                    <Text>Medium</Text>
                  </Ionicons>
                </Pressable>
                <Pressable
                  style={styles.settingsText}
                  onPress={() => ChangeTheme('3')}
                >
                  <Ionicons name="color-palette" size={25} color="#21a1d4">
                    <Text>Light</Text>
                  </Ionicons>
                </Pressable>
              </View>
            </View>
            <Pressable
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close [X]</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  clockbgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3b2f2f',
    padding: 10,
    margin: 0,
  },
  dateTextContainer: {
    flex: 0.2,
    flexDirection: 'row',
    padding: 0,
    margin: 0,
  },
  timeContainer: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    flexDirection: 'row',
    width: '100%',
  },
  timeTextContainer: {
    flex: 0.9,
    padding: 0,
    margin: 0,
    maxHeight: 595,
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: 'blue',
  },
  settingContainer: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontFamily: 'JackofGearsRegular',
    color: '#ca2b2bc3',
    fontWeight: 'bold',
  },

  /// MODAL STYLES
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dims the screen behind the modal
  },
  modalView: {
    flex: 1,
    flexDirection: 'column',
    maxHeight: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  settingsText: {
    borderRadius: 20,
    padding: 15,
    margin: 0,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 15,
    margin: 10,
    backgroundColor: '#2196F3',
    elevation: 2,
  },
  modalText: {
    marginBottom: 15,
    marginLeft: 20,
    marginTop: -20,
  },
  headerText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#010',
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'JackofGearsRegular',
  },
  bulletView: {
    padding: 0,
    margin: 1,
    textAlign: 'left',
  },
  bulletContainer: {
    borderRadius: 20,
  },
});

export default Clock;
