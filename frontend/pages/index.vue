<template>
  <div class="container-left">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 MHeader">

          <center> <h3>ENVIRONMENT VARIABLES</h3></center>
        </div>

      </div>
    </div>

    <div class="container conheight">
    <div class="row">
      <div class="col-sm-3 menuLeft">
        <div class="left">
          <aside class="menu" >
            <div><a>PROCESS LIST</a></div>
            <ul class="menu-list">
              <li>
                <ul>
                  <li><a @click.prevent="getEnvs('process1')" v-bind:class="{'active':'process1' == this.activeVariable}">Process1</a></li>
                  <li><a @click.prevent="getEnvs('process2')" v-bind:class="{'active': 'process2' == this.activeVariable}">Process2</a></li>
                </ul>
              </li>
            </ul>
            </ul>
          </aside>
        </div>
      </div>
      <div class="col-sm-9">
        <div class="row" v-if="!this.isForm">
          <div class="col-sm-12">
            <div class="row pad">
              <div class="col-sm-12">
                
                <button style="float: right;" class="btn btn-success" @click="form(-1, true)">Add New ENV</button>
              </div>
            </div>
            
            <div class="table table-responsive tableheight">
              <table class="table table-striped">
                 <thead class="thead-light">
                <tr>
                  <th>Key</th><th>Value</th><th>Action</th>
                </tr>
              </thead>
                <tbody>
                  <tr v-for="(row, index) in this.enviromentVeriables">
                    <td>{{row.key}}</td><td>{{row.value}}</td>
                    <td @click="form(index)"><div style="color:blue; cursor: pointer;"> Edit</div></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="row" v-if="this.isForm" style="padding:4%;">
          <div class="col-sm-12">
            <div class="row pad">
              <div class="col-sm-3">Key</div>
              <div class="col-sm-6"><input type="text" name="Keyid" id="Keyid" class="form-control" v-model="formKey"></div>
            </div>

            <div class="row pad">
              <div class="col-sm-3">Value</div>
              <div class="col-sm-6"><input type="text" name="valueid" id="valueid"  class="form-control" v-model="formValue"></div>
            </div>
            <div class="row pad">
              <div class="col-sm-12"><input type="submit" name="submit" value="Submit" @click="form"> </div>
            </div>



          </div>
        </div>

      </div>

    </div>

    </div>
  
  </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'
import processWriter from '~/assets/js/process/index'

export default {
  components: {
    // Logo
  },
  data () {
    return {
      activeVariable: "process1",
      enviromentVeriables: [],
      isForm: false,
      formKey: "",
      formValue: "",
      formIndex: -1
    }
  },
  methods: {


    getEnvs(processName){
      this.activeVariable = processName
      processWriter.apis.getEnvByProcess(processName).then((response) => {
        console.log("response: ", response)
        this.enviromentVeriables = response.enviroment
      }).catch((error) => {
        console.log("error: ", error)
      })
    },

    setEnv(keyValue){
      let data = {
        process_name: this.activeVariable,
        key: keyValue.key,
        value: keyValue.value
      }
      processWriter.apis.addNewEnv(data).then((response) => {
        console.log("response: ", response)
      }).catch((error) => {
        console.log("error: ", error)
      })
    },


    form(index, create=false){
      this.isForm = !this.isForm
      if(this.isForm && !create){
        this.formKey = this.enviromentVeriables[index].key
        this.formValue = this.enviromentVeriables[index].value
        this.formIndex = index
      }else if(!create && this.formIndex != -1){
        this.enviromentVeriables[this.formIndex].key != this.formKey? 
          this.enviromentVeriables[this.formIndex]["key"] = this.formKey:
            ""
        this.enviromentVeriables[this.formIndex].value != this.formValue?
          this.enviromentVeriables[this.formIndex]["value"] = this.formValue:
            ""
        this.formKey = ""
        this.formValue = ""
        this.formIndex = -1
      }else {
        if(this.formKey && this.formValue){
          let newEntity = {
            key: this.formKey,
            value: this.formValue
          }
          this.enviromentVeriables.push(newEntity)
          this.formKey = ""
          this.formValue = ""
          this.formIndex = -1
          this.setEnv(newEntity)
        }
      }
    }
  },

  mounted () {
    this.getEnvs(this.activeVariable)
  }
}
</script>