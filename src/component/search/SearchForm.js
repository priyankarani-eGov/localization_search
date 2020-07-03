import React from "react";
import SearchResult from "./SearchResult"
import axios from "axios";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


const instance = axios.create({
  baseURL: window.location.origin
});

class SearchForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      modules: [],
      locales: [],
      selectedModule: null,
      selectedLocale: null

    }
    this.handleChange = this.handleChange.bind(this);

  }

  render() {

    const { rows = [] } = this.state;
    const { handleChange } = this;
    console.log(rows);
    //handleChange();

    return (
      <div>

        <Paper>
          <form>
            <h2>Search Form</h2>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-module-native-simple">Module</InputLabel>
              <Select onChange={(e) => {
                this.setState({ selectedModule: e.target.value });
              }} native="native" label="Module" id="moduleId" inputProps={{
                name: 'module',
                id: 'outlined-module-native-simple'
              }}>
                <option aria-label="None" value="" /> {
                  this.state.modules.map((mod) => {
                    return <option value={mod.value} key={mod.key}>{mod.value}</option>
                  })
                }
              </Select>
            </FormControl><br /><br />
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-module-native-simple">Locale</InputLabel>
              <Select onChange={(e) => {
                this.setState({ selectedLocale: e.target.value });
              }} native="native" label="Locale" id="localeId" inputProps={{
                name: 'locale',
                id: 'outlined-module-native-simple'
              }}>
                <option aria-label="None" value="" /> {
                  this.state.locales.map((loc) => {
                    return <option value={loc.value} key={loc.key}>{loc.value}</option>
                  })
                }
              </Select>
            </FormControl>

          </form>
          <Button variant="contained" color="primary" onClick={(e) => {
                    e.preventDefault()
                    handleChange()
                }
                }>Submit
                </Button>
          
          </Paper>


      <div><p>Search Result</p>
          <SearchResult rows={rows} /></div>
      </div>
    )
  }

  handleChange = (() => {
    let { selectedLocale, selectedModule, rows } = this.state;
    let url = "/localization/messages/v1/_search?tenantId=pb";
    if (selectedModule != null) {
      url = url + '&module=' + selectedModule;
    }
    if (selectedLocale != null) {
      url = url + '&locale=' + selectedLocale;
    } else {
      url = url + '&locale=' + 'en_IN';
    }
    instance.post(url, {
      "RequestInfo": {
        "apiId": "Rainmaker",
        "ver": ".01",
        "ts": "",
        "action": "_search",
        "did": "1",
        "key": "",
        "msgId": "20170310130900|hi_IN",
        "authToken": null
      },
    }).then((response) => {
      console.log(response.data.messages);
      this.setState({
        rows: response.data.messages
      });
return <div><SearchResult rows={rows}/></div>

    })
      .catch(function (error) {
        console.log(error);
      });
  })

  componentDidMount = () => {
    const { handleChange } = this;
    instance.post('egov-mdms-service/v1/_search?tenantId=pb', {
      "RequestInfo": {
        "apiId": "Rainmaker",
        "ver": ".01",
        "ts": "",
        "action": "_search",
        "did": "1",
        "key": "",
        "msgId": "20170310130900|en_IN",
        "authToken": null
      },
      "MdmsCriteria": {
        "tenantId": "pb",
        "moduleDetails": [
          {
            "moduleName": "common-masters",
            "masterDetails": [

              {
                "name": "StateInfo"
              }
            ]
          }
        ]
      }
    }).then((response) => {
      //console.log(response);
      //console.log(response.data.MdmsRes['common-masters'].StateInfo[0].localizationModules)
      const stateInfo = response.data.MdmsRes['common-masters'].StateInfo[0];
      console.log(stateInfo);
      let moduleDropDown = stateInfo.localizationModules.map((md) => { return { value: md.value, key: md.label } });
      let localeDropDown = stateInfo.languages.map((lo) => { return { value: lo.value, key: lo.label } })
      this.setState({
        modules: moduleDropDown,
        locales: localeDropDown
      })
      console.log(module);
      handleChange();
    }).catch((error) => {
      console.log(error);
    });

  }
}

export default SearchForm;