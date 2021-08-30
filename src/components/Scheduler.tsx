import React from 'react';
import Calendar from './Calendar';

interface ISchedulerProps {

}

interface ISchedulerState {
}
export default class Scheduler extends React.Component<ISchedulerProps, ISchedulerState> {
    constructor(props: ISchedulerProps) {
        super(props);

        this.state = {

        }
    }
    render() {
        return (
            <>
                <Calendar handleShowLesson={this.addStudentToLesson} />
            </>
        )
    }

    private addStudentToLesson() {
        console.log("Adding student to lesson");
    }

}
