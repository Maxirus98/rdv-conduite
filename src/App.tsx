import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/typography.css';
import axios from 'axios';
import { calendar, mail, people, school } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IUser } from './models/IUser';
import ILesson from "./models/ILesson";
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import UserService from './services/UserService';
/* Theme variables */
import './theme/variables.css';

const App = (): JSX.Element => {
  const userService: UserService = new UserService();
  const [users, setUsers] = useState([
    {
      id: null,
      student: null,
      fullName: "",
      address: "",
      phone: "",
      email: "",
    } as IUser
  ]);

  const [lessons, setLessons] = useState([
    {
      id: null,
      subject: null,
      startTime: null,
      endTime: null,
      users: []
    } as ILesson
  ]);

  useEffect(() => {
    const getAllUsers = async () => {
      var allUsers = await userService.getAllUsers();
      console.log("allUsers", allUsers);
      setUsers(JSON.parse(JSON.stringify(allUsers)).data);
    }
    const getAllLessons = async () => {
      var response = await axios.get("http://192.168.56.1:8080/lesson/all");
      setTimeout(async () => setLessons(response.data), 200);
    }

    getAllUsers();
    getAllLessons();
  }, [])
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/schedule">
              <Tab1 userService={userService} users={users} lessons={lessons} />
            </Route>
            <Route exact path="/list">
              <Tab2 userService={userService} users={users} lessons={lessons} />
            </Route>
            <Route path="/apply">
              <Tab3 />
            </Route>
            <Route exact path="/">
              <Redirect to="/schedule" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="schedule" href="/schedule">
              <IonIcon icon={calendar} />
              <IonLabel>Horaire</IonLabel>
            </IonTabButton>
            <IonTabButton tab="list" href="/list">
              <IonIcon icon={people} />
              <IonLabel>Instructeurs et élèves</IonLabel>
            </IonTabButton>
            <IonTabButton tab="apply" href="/apply">
              <IonIcon icon={school} />
              <IonLabel>Appliquer pour une leçon</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
}


export default App;
