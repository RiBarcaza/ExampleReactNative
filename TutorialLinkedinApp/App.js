
import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Button, Divider, Input } from 'react-native-elements';
import NetInfo from '@react-native-community/netinfo';
import { ListaTeams } from './components/listaTeams';
import { ModalTeam } from './components/modalTeam';
import { DashboardScreen } from './components/dashboard';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';


const listEquipos = [
  {
    id: "1",
    nombre: "Equipo 1",
    logo: "https://via.placeholder.com/600x300/77b300/ffffff?text=Logo+equipo",
    estado: true,
    jugadores: [{ nombre: "Hugo" }]
  },
  {
    id: "2",
    nombre: "Equipo 2",
    logo: "https://via.placeholder.com/600x300/2eb8b8/ffffff?text=Logo+equipo",
    estado: false,
    jugadores: [{ nombre: "Paco" }, { nombre: "Luis" }]
  },
  {
    id: "3",
    nombre: "Equipo 3",
    logo: "https://via.placeholder.com/600x300/0040ff/ffffff?text=Logo+equipo",
    estado: true,
    jugadores: [
      { nombre: "Susana" },
      { nombre: "Carolina" },
      { nombre: "Marina" }
    ]
  },
  {
    id: "4",
    nombre: "Equipo 4",
    logo: "https://via.placeholder.com/600x300/ff00bf/ffffff?text=Logo+equipo",
    estado: false,
    jugadores: []
  },
  {
    id: "5",
    nombre: "Equipo 5",
    logo: "https://via.placeholder.com/600x300/D2B48C/ffffff?text=Logo+equipo",
    estado: true,
    jugadores: [{ nombre: "Gabriela" }, { nombre: "Alonso" }]
  }
];
const listaEquipos = []

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teamVisible: false,
      selectedTeam: {},
      offline: true,
      listEquipos: listEquipos,
      nombre: 'aaa',
      user: {
        username: '',
        password: ''
      }
    };
  }

  testClass() {
    var user = Object.assign({}, this.state.user, {username: this.state.nombre, password: this.state.nombre});
    this.setState({user});

    Alert.alert('', user.username + '\n' + user.password);
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener("connectionChange", isConnected => {
      this.setState({
        offline: !isConnected
      });
      //this.getRemoteTeams();
      if (isConnected) {
      } else {
        Alert.alert("Dispositivo sin conexión a Internet");
      }
    });
  }

  getData() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        //Alert.alert("Datos enviados");
        this.getRemoteTeams();
      } else {
        Alert.alert("Verifica tu conexión");
      }
    });
  }

  async getRemoteTeams() {
    let response = await fetch('https://api-mi-liga.now.sh/api/equipos');
    let responseJson = await response.json();

    var prueba = responseJson.filter(x => x.jugadores.length > 2);

    this.setState({
      listEquipos: prueba
    });
  }

  toggleTeam() {
    this.setState({
      teamVisible: !this.state.teamVisible
    });
  }

  displayTeam(equipo) {
    this.setState({
      selectedTeam: equipo
    });
    this.toggleTeam();
  }

  async getAlert() {
    Alert.alert("Dispositivo sin conexión a Internet");
  }

  render() {
    return (
      <View style={{ justifyContent: 'center', padding: 10 }}>
        <ListaTeams
          listEquipos={this.state.listEquipos}
          onSelectTeam={equipo => this.displayTeam(equipo)} />
        <ModalTeam
          visible={this.state.teamVisible}
          equipo={this.state.selectedTeam}
          onToggleTeam={() => this.toggleTeam()} />
        <Divider style={{ marginTop: 15 }} />
        <Input
          autoCapitalize='none'
          placeholder='Nombre:' value={this.state.nombre} onChangeText={nombre => this.setState({ nombre })} />
        <Divider style={{ marginTop: 15 }} />
        <Button title='Ir a Dashboard' onPress={(this.state.nombre == 'aaa') ? () => this.props.navigation.navigate('Dashboard', { nombre: this.state.nombre }) : null} />
        <Divider style={{ marginTop: 15 }} />
        <Button title='Prueba clase User' onPress={() => this.testClass()} />
      </View>
    );
  }
}

const MainNavigator = createStackNavigator({
  Home: {
    screen: App,
    navigationOptions: () =>
      ({ title: 'Inicio', headerBackTitle: null })
  },
  Dashboard: { screen: DashboardScreen, navigationOptions: () => ({ title: 'Dashboard' }) }
},
  {
    initialRouteName: 'Home'
  }
);

const TabNavigator = createBottomTabNavigator({
  Home: App,
  //Settings: SettingsScreen,
});

//export default createAppContainer(MainNavigator);

export default createAppContainer(
  createBottomTabNavigator(
    {
      Home: MainNavigator,
      Dashboard: DashboardScreen,
    },
    {
      /* Other configuration remains unchanged */
    }
  ));
