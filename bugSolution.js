// bugSolution.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const MAX_SIZE = 1000; // Adjust based on your device and AsyncStorage limits

const storeLargeJson = async (key, jsonObject) => {
  const jsonString = JSON.stringify(jsonObject);
  const chunks = chunkString(jsonString, MAX_SIZE);
  await AsyncStorage.setItem(key + '_meta', JSON.stringify({ chunks: chunks.length }));
  for (let i = 0; i < chunks.length; i++) {
    await AsyncStorage.setItem(`${key}_${i}`, chunks[i]);
  }
};

const retrieveLargeJson = async (key) => {
  const meta = await AsyncStorage.getItem(key + '_meta');
  if (meta) {
    const { chunks } = JSON.parse(meta);
    const combinedString = await Promise.all(
      Array.from({ length: chunks }).map((_, i) => AsyncStorage.getItem(`${key}_${i}`))
    ).then(chunks => chunks.join(''));
    return JSON.parse(combinedString);
  } else {
    return null; 
  }
};

const chunkString = (str, size) => {
  const numChunks = Math.ceil(str.length / size);
  const chunks = new Array(numChunks);

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size);
  }

  return chunks;
};

export { storeLargeJson, retrieveLargeJson };