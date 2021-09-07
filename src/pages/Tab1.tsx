import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Calendar from '../components/Calendar';
import './Tab1.css';

const Tab1: React.FC = () => {
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
        <Calendar />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
