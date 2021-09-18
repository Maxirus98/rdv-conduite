import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import UserList from '../components/UserList';
import { IUser } from '../modals/IUser';
import { Users } from '../modals/Users';
import UserService from '../services/UserService';
import './Tab2.css';

const Tab2: React.FC = () => {
  const userService: UserService = new UserService();
  const [users, setUsers] = useState([
    {} as IUser
  ]);

  useEffect(() => {
    const getAllUsers = async () => {
      if (!sessionStorage.getItem("users")) {
        var allUsers = await userService.getAllUsers();
        console.log("allUsers", allUsers);
        setUsers(JSON.parse(JSON.stringify(allUsers)).data);
      }
    }

    getAllUsers();
  }, [])


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Liste des instructeurs et des étudiants</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">List</IonTitle>
          </IonToolbar>
        </IonHeader>
        <UserList userService={userService} users={users} />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
