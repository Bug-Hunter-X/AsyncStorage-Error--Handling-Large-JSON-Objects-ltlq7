# React Native AsyncStorage Large JSON Handling Bug

This repository demonstrates a bug in React Native's AsyncStorage when attempting to store and retrieve large JSON objects.  AsyncStorage is not designed to handle very large strings efficiently, and this can lead to data corruption or app crashes.

## Bug Description

The bug occurs when trying to store a JSON object exceeding a certain size limit within AsyncStorage.  This leads to either data loss, errors during retrieval, or unexpected app behavior.  This example provides a clear illustration of the problem and a solution for handling large data.

## Solution

The solution involves splitting the large JSON object into smaller chunks before storing it in AsyncStorage.  When retrieving the data, these chunks are reassembled to reconstruct the original JSON.  This approach mitigates the limitations of AsyncStorage and provides a more robust way to handle large datasets.