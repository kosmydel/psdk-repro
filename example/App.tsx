import PsdkRepro from 'psdk-repro';
import { useState } from 'react';
import { Button, SafeAreaView, ScrollView, Text, View } from 'react-native';

export default function App() {
  const [isInitialized, setIsInitialized] = useState(false);
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
