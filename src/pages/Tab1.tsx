import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Calendar from '../components/Calendar';
import UserList from '../components/UserList';
import LessonService from '../services/LessonService';
import UserService from '../services/UserService';
import './Tab1.css';

const Tab1: React.FC = () => {
  const userService: UserService = new UserService();
  const lessonService: LessonService = new LessonService();
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
        <Calendar userService={userService} lessonService={lessonService} />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
