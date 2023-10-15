import React, { useState } from 'react';
import { SafeAreaView, View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { StatusBar } from 'react-native';

function RAWStudios() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Reload the WebView content here
    // You can use a ref to the WebView and call webViewRef.reload() if needed
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleRefresh}>
          <Text style={styles.headerText}>Refresh</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>RAW Studios</Text>
      </View>
      {isLoading && (
        <ActivityIndicator
          size="large"
          color="blue"
          style={styles.loadingIndicator}
        />
      )}
      <WebView
        source={{ uri: 'https://www.youtube.com/@RAW-gh8hg/streams' }}
        allowsFullscreenVideo={true}
        userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile"
        onLoad={() => {
          setIsLoading(false);
          setIsRefreshing(false);
        }}
        onNavigationStateChange={(navState) => {
          // Handle navigation state changes here
          if (navState.url !== 'https://www.youtube.com/@RAW-gh8hg/videos') {
            // Handle external links or navigation within the WebView
            // You can use React Navigation or other routing libraries here
            // Example: navigation.navigate('WebView', { url: navState.url });
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Background color of the entire screen
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black', // Text color for the header
    marginLeft: 10,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default RAWStudios;
