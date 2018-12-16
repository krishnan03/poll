import {NetInfo} from 'react-native';
// import handleConnectivityClass from '../components/handleConnectivityClass';

// hcc= new handleConnectivityClass();
// isConnected=hcc.state.isConnected
const offlineHelper = {
    // state{isConnected:true}
    whenDidMount: function(isConnected){
        NetInfo.isConnected.addEventListener('connectionChange',isConnected);
        // handleFirstConnectivityChangeForRemove(isConnected)
    },
    whenUnmount: function(isConnected){
        NetInfo.isConnected.removeEventListener('connectionChange', isConnected);   
        // handleFirstConnectivityChangeForAdd(isConnected) 
    },

    // handleConnectivityChange :function(isConnected) {
    //     if (isConnected) {
    //       this.setState({ isConnected });
    //     } else {
    //       this.setState({ isConnected });
    //     }
    //     return this.state.isConnected
    //   },
//    handleReturen:function(){
// this.state.isConnected
//    }
}



export default offlineHelper;