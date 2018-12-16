import {NetInfo} from 'react-native';

const offlineHelper = {
    // state{isConnected:true}
    whenDidMount: function(isConnected){
        NetInfo.isConnected.addEventListener('connectionChange',isConnected);
        
    },
    whenUnmount: function(isConnected){
        NetInfo.isConnected.removeEventListener('connectionChange', isConnected);   
        
    }
    
}

export default offlineHelper;