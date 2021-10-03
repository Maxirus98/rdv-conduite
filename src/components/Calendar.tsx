import { IonButton, IonGrid, IonIcon, IonItem, IonList, IonTitle } from "@ionic/react";
import { Query } from '@syncfusion/ej2-data';
import { DropDownListComponent, SelectEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { Agenda, Day, DragAndDrop, EventClickArgs, Inject, Month, PopupCloseEventArgs, PopupOpenEventArgs, Resize, ScheduleComponent, Week } from '@syncfusion/ej2-react-schedule';
import axios from "axios";
import { checkmarkOutline, closeOutline, personCircleOutline } from "ionicons/icons";
import React from "react";
import ReactDOM from "react-dom";
import ILesson from "../models/ILesson";
import { IUser } from "../models/IUser";
import { Lessons } from "../models/Lessons";
import LessonService from "../services/LessonService";
import UserService from "../services/UserService";
import "./Calendar.css";

interface ICalendarState {
    selectedEventData: ILesson;
    lessons: ILesson[];
    searchText: string;
}

interface ICalendarProps {
    users: IUser[];
    allLessons: ILesson[];
    userService: UserService;
    lessonService: LessonService;
}

export default class Calendar extends React.Component<ICalendarProps, ICalendarState> {
    private userNames = [];
    private lessonInit = {
        id: null,
        subject: null,
        startTime: null,
        endTime: null,
        users: []
    };


    constructor(props: ICalendarProps) {
        super(props);
        this.state = {
            selectedEventData: this.lessonInit,
            lessons: [this.lessonInit],
            searchText: "",
        }
    }

    public render(): JSX.Element {
        const { users, allLessons } = this.props;
        const { lessons } = this.state;
        return (
            <>
                <ScheduleComponent
                    popupOpen={(args: PopupOpenEventArgs) => {
                        if (args.type == "QuickInfo") {
                            this.replaceQuickInfoTemplate();
                        }
                        document.querySelector(".e-title-text").textContent = "Modifier la liste des participants";
                    }}
                    views={['Day', 'Week', 'Month', 'Agenda']}
                    popupClose={(args: PopupCloseEventArgs) => {
                        if (args.type == "QuickInfo") {
                            this.addLesson(args.data);
                        }
                        if (args.type == "Editor") {
                            this.setState({ selectedEventData: this.lessonInit });
                        }
                    }}
                    eventSettings={{
                        dataSource: allLessons,
                        fields: {
                            id: 'id',
                            subject: { name: 'subject' },
                            startTime: { name: 'startTime' },
                            endTime: { name: 'endTime' }
                        }
                    }}
                    startHour="10:00"
                    endHour="21:00"
                    eventClick={(args: EventClickArgs) => {
                        this.setState({ selectedEventData: args.event as ILesson });
                    }}
                    editorTemplate={this.getEditorTemplate.bind(this)}
                    cellDoubleClick={(args: PopupOpenEventArgs) => {
                        args.cancel = true;
                    }}
                    resizeStop={(args) => this.addLesson(args.data)}
                    dragStop={(args) => this.addLesson(args.data)}
                    firstDayOfWeek={1}
                    showWeekend={true}
                >
                    <Inject services={[Day, Week, Month, Agenda, DragAndDrop, Resize]} />
                </ScheduleComponent>
            </>
        );
    }

    public async componentDidMount(): Promise<void> {
        const { users, allLessons } = this.props;
        // Changes users to an Object[] with FullName key
        users.map((user, key) => {
            this.userNames.push({
                FullName: user.fullName, User: Object.values(user).toString()
            });
        })
    }

    private replaceQuickInfoTemplate(): void {
        var cellPopup: ReactDOM.Container = document.querySelector(".e-cell-popup");
        var popupEventDetailsButton: ReactDOM.Container = document.querySelector(".e-event-details");
        var editor = React.createElement(this.getAppointmentTemplate, this);
        var popupContent: ReactDOM.Container;

        if (cellPopup)
            popupContent = cellPopup.querySelector(".e-popup-content");
        if (popupContent)
            ReactDOM.render(editor, popupContent);
        if (popupEventDetailsButton)
            ReactDOM.render(null, popupEventDetailsButton);
    }

    private getAppointmentTemplate(): JSX.Element {
        return (
            <>
                <h2 className="e-textLabel">Module/Sortie</h2>
                <DropDownListComponent
                    className="e-field e-input"
                    data-name="Subject"
                    dataSource={Object.keys(Lessons)}
                    placeholder="Module/Sortie"
                />
            </>
        );
    }

    private getEditorTemplate() {
        const { selectedEventData } = this.state;
        const getParticipants = (key: React.Key, user: IUser): JSX.Element => {
            return <IonItem key={key}>
                <IonIcon color={user.student ? "success" : "secondary"} icon={personCircleOutline} />
                {user.fullName}
                <IonIcon
                    icon={closeOutline}
                    color="danger"
                    onClick={this.deleteUser.bind(this, key)} />
            </IonItem>
        };
        return (
            <>
                <IonGrid>
                    <DropDownListComponent
                        className="e-field e-input"
                        data-name="Users"
                        dataSource={this.userNames}
                        placeholder="Ajouter des participants"
                        filtering={this.onFiltering.bind(this)}
                        allowFiltering={true}
                        fields={{ text: "FullName", value: "User" }}
                        select={
                            this.addUserToSelectedEventData.bind(this)
                        }
                        filterBarPlaceholder={"Entrez le nom du participant"}
                    />
                    <IonTitle size="large" style={{ marginTop: "1em", textAlign: "center" }}>Participants: </IonTitle>
                    <IonList>
                        {selectedEventData.users && selectedEventData.users.map((user, key) => {
                            return getParticipants(key, user);
                        })}
                    </IonList>
                    <div className="e-footer-buttons">
                        <IonButton onClick={this.addUsersToLesson.bind(this)}>
                            <IonIcon icon={checkmarkOutline} />
                        </IonButton>
                        <IonButton color="danger" onClick={this.deleteLesson.bind(this, this.state.selectedEventData.id)}>
                            <IonIcon icon={closeOutline} />
                        </IonButton>
                    </div>
                </IonGrid>

            </>
        );
    }

    private onFiltering = e => {
        let query = new Query();
        query = (e.text !== "") ? query.where("FullName", "contains", e.text, true) : query;
        e.updateData(this.userNames, query);
    };

    private addUserToSelectedEventData(args: SelectEventArgs) {
        const { selectedEventData } = this.state;

        var itemDataString = JSON.stringify(args.itemData);
        var user: string = JSON.parse(itemDataString).User;

        var properties: string[] = user.split(',');

        var newUser: IUser = {
            id: parseInt(properties[0]),
            fullName: properties[1],
            address: properties[2],
            phone: properties[3],
            email: properties[4],
            student: properties[5] === "true"
        };

        if (!selectedEventData.users)
            selectedEventData.users = [];
        this.setState({ selectedEventData: { ...selectedEventData, users: selectedEventData.users.concat(newUser) } });
    }

    private async addLesson(eventData: any): Promise<void> {
        const { lessons } = this.state;

        var addedLesson: ILesson = await axios.post("http://192.168.56.1:8080/lesson/save", {
            id: eventData.id || eventData.Id,
            subject: eventData.Subject || eventData.subject,
            startTime: eventData.startTime || eventData.StartTime,
            endTime: eventData.endTime || eventData.EndTime,
            users: eventData.users || eventData.Users
        } as ILesson);

        lessons.concat([addedLesson]);
    }

    private async addUsersToLesson(): Promise<void> {
        const { selectedEventData } = this.state;
        await axios.post("http://192.168.56.1:8080/lesson/save", selectedEventData);
        window.location.reload();
    }

    private deleteUser(index: number) {
        const { selectedEventData } = this.state;
        selectedEventData.users.splice(index, 1);
        this.setState({ selectedEventData });
    }

    private async deleteLesson(id: number): Promise<void> {
        await axios.delete(`http://192.168.56.1:8080/lesson?id=${id}`);
        window.location.reload();
    }
}