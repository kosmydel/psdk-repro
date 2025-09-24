import PsdkRepro from 'psdk-repro';
import { useState } from 'react';
import { Button, SafeAreaView, ScrollView, Text, View } from 'react-native';

export default function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [loggedInUserID, setLoggedInUserID] = useState(0);
  const [pushNotificationID, setPushNotificationID] = useState('');
  const [loggedInUserFriends, setLoggedInUserFriends] = useState<string[]>([]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Module API Example</Text>
        <Group name="PSDK Repro">
            <Button title="Check if initialized" onPress={() => {
                console.log('Checking if initialized');
                try {
                    console.log('Getting is initialized');
                    const isInitialized = PsdkRepro.isInitialized();
                    console.log("Is initialized", {isInitialized});
                    setIsInitialized(isInitialized);
                } catch (error) {
                    console.error('Error getting is initialized', error);
                    setIsInitialized(false);
                }
            }} />
          <Text>Is initialized: {isInitialized ? 'YES' : 'NO'}</Text>
          <Button title="Get logged in user ID" onPress={() => {
            console.log('Getting logged in user ID');
            const loggedInUserID = PsdkRepro.getLoggedInUserID();
            console.log('Logged in user ID', {loggedInUserID});
            setLoggedInUserID(loggedInUserID);
          }} />
          <Text>Logged in user ID: {loggedInUserID}</Text>
        </Group>
        <Group name="Push notifications">
            <Button title="Register for push notifications" onPress={async () => {
                console.log('Registering for push notifications');
                try {
                const pushNotificationID = await PsdkRepro.registerNotifications();
                    console.log('Push notification ID', {pushNotificationID});
                    setPushNotificationID(pushNotificationID);
                } catch (error) {
                    console.error('Error registering for push notifications', error);
                    setPushNotificationID('');
                }
            }} />
            <Text>Push notification ID: {pushNotificationID}</Text>
        </Group>
        <Group name="Logged in user friends">
            <Button title="Get logged in user friends" onPress={async () => {
                console.log('Getting logged in user friends');
                try {
                    const loggedInUserFriends = await PsdkRepro.getLoggedInUserFriends();
                    console.log('Logged in user friends', {loggedInUserFriends});
                    setLoggedInUserFriends(loggedInUserFriends);
                } catch (error) {
                    console.error('Error getting logged in user friends', error);
                    setLoggedInUserFriends([]);
                }
            }} />
            <Text>Logged in user friends: {loggedInUserFriends.join(', ')}</Text>
        </Group>
      </ScrollView>
    </SafeAreaView>
  );
}

function Group(props: { name: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupHeader}>{props.name}</Text>
      {props.children}
    </View>
  );
}

const styles = {
  header: {
    fontSize: 30,
    margin: 20,
  },
  groupHeader: {
    fontSize: 20,
    marginBottom: 20,
  },
  group: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  view: {
    flex: 1,
    height: 200,
  },
};
