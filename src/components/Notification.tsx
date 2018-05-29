import * as React from 'react';
import * as FontAwesome from 'react-icons/lib/fa';

class Notification extends React.Component<{}, {}> {

    constructor(props: any) {
        super(props);
        this.hasSubscribed = this.hasSubscribed.bind(this);
    }

    hasSubscribed(): boolean {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            return true;
        }
        return false;
    }

    render() {
        return (
            <span style={{ float: "right" }}>
                {/* <FontAwesome.FaRefresh id="btnRefresh" style={ { cursor: "pointer"} } /> */}
                {
                    this.hasSubscribed() ?
                        <FontAwesome.FaBellO style={{ cursor: "pointer" }} />
                        :
                        <FontAwesome.FaBellSlashO style={{ cursor: "pointer" }} />
                }
            </span>

        );
    }
}

export default Notification;