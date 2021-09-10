import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Calendar from '../components/Calendar';
import UserService from '../services/UserService';
import './Tab1.css';

const Tab1: React.FC = () => {
  const service: UserService = new UserService();
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
        <Calendar service={service} />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
