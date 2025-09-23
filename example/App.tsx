import PsdkRepro from 'psdk-repro';
import { useState } from 'react';
import { Button, SafeAreaView, ScrollView, Text, View } from 'react-native';

export default function App() {
  const [initializationState, setInitializationState] = useState<string | null>(null);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Module API Example</Text>
        <Group name="PSDK Repro">
            <Button title="Check if initialized" onPress={async () => {
                console.log('Checking if initialized');
                try {
                    console.log('Getting is initialized');
                    const isInitialized = await PsdkRepro.isInitialized();
                    console.log("Is initialized", {isInitialized});
                    setInitializationState(JSON.stringify(isInitialized));
                } catch (error) {
                    console.error('Error getting is initialized', error);
                    setInitializationState(null);
                }
            }} />
          <Text>Is initialized: {initializationState ? initializationState : 'NO'}</Text>
          <Button title="Register for push notifications" onPress={async () => {
            console.log('Registering for push notifications');
            try {
                await PsdkRepro.register();
                console.log('Registered for push notifications');
            } catch (error) {
                console.error('Error registering for push notifications', error);
            }
          }} />
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
