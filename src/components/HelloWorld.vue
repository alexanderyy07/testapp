<template>
  <div class="hello">
    <h2>Test Project</h2>
    <form @submit.prevent="addField" action="">
      <div class="form-group">
        <label>Field Name</label>
        <input type="text" name="FieldName" v-model="field" v-validate="'required'">
      </div>
      <div>
        <label>Field Type</label>
        <select name="FieldType" v-model="text" v-validate="'required:true'">
          <option value="Baseball">Baseball</option>
          <option value="Football">Football</option>
          <option value="Basketball">Basketball</option>
        </select>
      </div>
      <span v-if="errors.has('FieldType')" class="error">
          {{ errors.first('FieldType')}}
      </span>
      <span v-if="errors.has('FieldName')" class="error">
          {{ errors.first('FieldName')}}
      </span>
      <div>
        <button>Add Field</button>
      </div>
    </form>
    <div>
      <label for="count">Count</label>
      <span v-text="addedFieldCount"></span>
    </div>
    <div>
      <ul>
        <li
          v-for="(field, index) in addedFields"
          :key="index"
        >
          <span>{{field.field_name}}</span>
          <span>{{field.field_type}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import store from '../store'
import Vue from 'vue'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate)
export default {
  name: 'HelloWorld',
  data () {
    return {
      field: '',
      text: '',
      added_field_names: [],
      added_fields: [],
      field_count: 0
    }
  },
  computed: { addedFields: () => {
    this.added_field_names = store.state.field_name.split(',').filter(function (entry) { return entry.trim() !== '' })
    this.added_fields = []
    for (var x in this.added_field_names) {
      this.added_fields.push({
        field_name: this.added_field_names[x],
        field_type: store.state.selected_fields[x]
      })
    }
    this.field_count = this.added_field_names.length
    return this.added_fields
  },
  addedFieldCount: () => store.state.selected_fields.length
  },
  methods: {
    addField () {
      this.$validator.validate().then(result => {
        if (result) {
          store.commit('addField', {
            field: this.field, text: this.text
          })
          this.field = this.text = ''
        }
      })
    },
    removeTodo (id) {
      store.commit('removeTodo', id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.error {
  color: red;
}
</style>
