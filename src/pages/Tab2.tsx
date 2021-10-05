import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import UserList from '../components/UserList';
import './Tab2.css';

const Tab2 = ({ userService, users }): JSX.Element => {
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
