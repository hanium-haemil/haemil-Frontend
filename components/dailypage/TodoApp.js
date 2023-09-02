import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const TodoApp = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodoItems([...todoItems, newTodo]);
      setNewTodo('');
    }
  };

  const removeTodo = (index) => {
    const updatedTodos = [...todoItems];
    updatedTodos.splice(index, 1);
    setTodoItems(updatedTodos);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          value={newTodo}
          onChangeText={text => setNewTodo(text)}
        />
        <Button title="Add" onPress={addTodo} />
      </View>
      <FlatList
        data={todoItems}
        renderItem={({ item, index }) => (
          <View style={styles.todoItem}>
            <Text>{item}</Text>
            <Button title="Remove" onPress={() => removeTodo(index)} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    padding: 8,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default TodoApp;
