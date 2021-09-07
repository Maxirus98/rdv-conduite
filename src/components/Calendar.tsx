import { IonCol, IonFabButton, IonGrid, IonIcon, IonInput, IonItem, IonItemDivider, IonList, IonRow } from "@ionic/react";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Agenda, Day, EventClickArgs, Inject, Month, PopupOpenEventArgs, ScheduleComponent, Week } from '@syncfusion/ej2-react-schedule';
import { add } from "ionicons/icons";
import React from "react";
import ReactDOM from "react-dom";
import { IUser } from "../modals/IUser";
import { Lessons } from "../modals/Lessons";

interface ICalendarState {
    selectedEventData: Record<string, any>
    selectedEventForm: JSX.Element[];
}

interface ICalendarProps {
}

const ADD_STUDENT_FORM: JSX.Element =
    <>
        <IonItem>
            <IonInput placeholder="Le prénom de l'étudiant"></IonInput>
        </IonItem>
        <IonItem>
            <IonInput placeholder="Le nom de l'étudiant"></IonInput>
        </IonItem>
    </>

export default class Calendar extends React.Component<ICalendarProps, ICalendarState> {
    constructor(props: ICalendarProps) {
        super(props);

        this.state = {
            selectedEventData: null,
            selectedEventForm: [
                ADD_STUDENT_FORM
            ]
        }
    }

    public render(): JSX.Element {
        return (
            <>
                <ScheduleComponent
                    showHeaderBar={false}
                    popupOpen={(args: PopupOpenEventArgs) => {
                        if (args.type == "QuickInfo") {
                            this.replaceQuickInfoTemplate();
                        }
                    }}
                    eventClick={(args: EventClickArgs) => {
                        this.setState({ selectedEventData: args.event });
                    }}
                    editorTemplate={this.getEditorTemplate.bind(this)}
                    cellDoubleClick={(args: PopupOpenEventArgs) => {
                        args.cancel = true;
                    }}
                    showWeekend={false}
                >
                    <Inject services={[Day, Week, Month, Agenda]} />
                </ScheduleComponent>
            </>
        );
    }

    private replaceQuickInfoTemplate(): void {
        var cellPopup = document.querySelector(".e-cell-popup");
        var popupEventDetailsButton = document.querySelector(".e-event-details");
        var editor = React.createElement(this.getAppointmentTemplate, this);
        var popupContent;

        if (cellPopup)
            popupContent = cellPopup.querySelector(".e-popup-content");
        if (popupContent)
            ReactDOM.render(editor, popupContent);
        if (popupEventDetailsButton)
            ReactDOM.render(null, popupEventDetailsButton);
    }

    private getAppointmentTemplate(): JSX.Element {
        return (
            <IonGrid>
                <IonRow>
                    <IonCol>Module/Sortie</IonCol>
                    <IonCol className="e-textLabel">
                        <DropDownListComponent
                            className="e-field e-input"
                            data-name="Subject"
                            dataSource={Object.keys(Lessons)}
                            placeholder="Module/Sortie"
                        /></IonCol>
                </IonRow>
            </IonGrid>
        );
    }

    private getEditorTemplate(): JSX.Element {
        const { selectedEventData, selectedEventForm } = this.state;
        return (
            <IonGrid>
                <IonRow>
                    <IonCol>Module/Sortie</IonCol>
                    <IonCol className="e-textLabel">
                        <DropDownListComponent
                            className="e-field e-input"
                            data-name="Subject"
                            dataSource={Object.keys(Lessons)}
                            placeholder="Module/Sortie"
                        /></IonCol>
                </IonRow>
                <IonRow>
                    <IonCol className="e-textLabel">From</IonCol>
                    <IonCol>
                        <DateTimePickerComponent className="e-field" id="StartTime" data-name="StartTime"
                        />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>To</IonCol>
                    <IonCol>
                        {selectedEventData && <DateTimePickerComponent className="e-field" id="EndTime" data-name="EndTime" min={
                            new Date(selectedEventData.StartTime)}
                        />}
                    </IonCol>
                </IonRow>
                <IonList>
                    {selectedEventForm.map((item, key) => {
                        return (
                            <>
                                {item}
                            </>
                        );
                    })}
                </IonList>
                <IonFabButton>
                    <IonIcon icon={add} onClick={this.addStudentForm.bind(this)} />
                </IonFabButton>
            </IonGrid>
        );
    }

    private addStudentForm() {
        const { selectedEventForm } = this.state;
        if (selectedEventForm.length < 3) {
            selectedEventForm.push(ADD_STUDENT_FORM);
            this.setState({ selectedEventForm });
        }
    }
}