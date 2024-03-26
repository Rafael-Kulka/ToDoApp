import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  const addTask = () => {
    if(task.trim() !== ''){
      setTaskList([...taskList, {text: task, completed: false}]);
      setTask('');
    }
  };

  const removeTask = index => {
    const newTaskList = [...taskList];
    newTaskList.splice(index, 1);
    setTaskList(newTaskList);
  };

  const toggleTaskCompletion = index => {
    const newTaskList = [...taskList];
    newTaskList[index].completed = !newTaskList[index].completed;
    setTaskList(newTaskList);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de tarefas</Text>
    
      <TextInput 
        style={styles.input}
        placeholder="Digite uma tarefa"
        value={task}
        onChangeText={text => setTask(text)}
      />
      <Button title="Adicionar tarefa" onPress={addTask}/>
      {
        taskList.map((item, index) => (
          <View key={index} style={styles.taskContainer}>
            <TouchableOpacity onPress={() => toggleTaskCompletion(index)}>
              <Text style={[styles.task, item.completed && styles.completedTask]}>
              {item.text}</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <Text style={styles.RemoveButton} onPress={() => removeTask(index)} >Remover</Text>
            </View>
          </View>
        ))
      } 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  task: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  RemoveButton: {
    color: '#f00',
    fontSize: 15,
    fontWeight: 'bold',
  }
});
