import React, { Component, Fragment } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { observer, Provider } from 'mobx-react'
import { SplashPage } from './screens'
import { colors } from './common/Colors'
import stores, { navigationDataStore } from './stores'
import { setRouterHandler } from './navigator'
import { LogBox } from 'react-native'

interface State {
    //
}

interface Props {
    //
}

const style = { flex: 1, backgroundColor: colors.white }

@observer
class App extends Component<Props, State>  {

    componentDidMount() {
        LogBox.ignoreAllLogs(true)
        setRouterHandler()
    }

    render() {
        const { router: Router, currentStackName } = navigationDataStore
        return (
            <Provider {...stores}>
                {Router ? (
                    <>
                        <GestureHandlerRootView style={style}>
                            <Router />
                        </GestureHandlerRootView>
                    </>
                ) : <SplashPage />
                }
            </Provider>
        )
    }
}

export default App