import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import LessonAppliance from '../components/LessonAppliance';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Appliquer pour une leçon</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <LessonAppliance />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
