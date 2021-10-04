import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Calendar from '../components/Calendar';
import './Tab1.css';

const Tab1 = ({ userService, users, lessons, userList }): JSX.Element => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Grille des rendez-vous</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Horaire</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Calendar userService={userService} users={users} allLessons={lessons} userList={userList} />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
