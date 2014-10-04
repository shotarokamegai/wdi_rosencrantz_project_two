// *Category View*

var CategoryView = Backbone.View.extend({

	tagName: "li",

	// template: _.template("name:" + $("#categories").html()),
	categoriesTemplate: _.template( $("#categories").html() ), //the order is really important!!

	events: {
        "click h3.category": "all",
    },

	initialize: function(){
    	// this.listenTo(this.model, "change", this.render);
    	// this.listenTo(this.model, "destroy remove", this.remove);
    	categoryCollection.fetch();
  	},

  	defaults: {
		name: ""
	},

  	render: function(){
		var li = this.$el.html(this.categoriesTemplate(this.model));
		$('ul').append(li);
	},

	all: function(){
		console.log('clicked!');
		var id = this.model.id;
		contactCollection.fetch({success: function(e){  // display models in collection
			$('li').remove();
			for(var i=0;i<contactCollection.models.length;i++){
				if(contactCollection.models[i].attributes.category_id == id) {
					var view = new ContactView({model: contactCollection.models[i].attributes});
					$('.categories').remove();
					view.render();
				}
			}
		}});
	},
});

// *Category Model*

var CategoryModel = Backbone.Model.extend({
  	urlRoot: "/categories"
});

categoryModel = new CategoryModel();

// *Category Collection*

var CategoryCollection = Backbone.Collection.extend({
  	url: "/categories",
  	model: CategoryModel // put models to collection
});

categoryCollection = new CategoryCollection();

var CategoriesView = Backbone.View.extend({
	initialize: function() {
		categoryCollection.fetch({success: function(e){  // display models in collection

			for(var i=0;i<categoryCollection.models.length;i++){
				var view = new CategoryView({model: categoryCollection.models[i].attributes});
				view.render();
			}
		}});
					debugger
		console.log(categoryCollection);
	}
});

var CategoryList = new CategoriesView({ collection: categoryCollection, el: $("ul") }); // this line is for rendering a category list

//////////////////////////////////////////////////////

// *Contact View*

var ContactView = Backbone.View.extend({

	tagName: "li",

	contactsTemplate: _.template( $("#contacts").html() ),

	events: {
        "click h3.contact": "all",
    },

	initialize: function(){
    	// this.listenTo(this.model, "change", this.render);
    	// this.listenTo(this.model, "destroy remove", this.remove);
    	contactCollection.fetch();
  	},

  	defaults: {
		name: "",
		age: 0,
		address: "",
		phone_number: 0,
		category_id: 1,
		picture: ""
	},

  	render: function(){
		var li = this.$el.html(this.contactsTemplate(this.model));
		$('ul').append(li);
	},

	all: function(){
		console.log('clicked!');
		var id = this.model.id;
		contactCollection.fetch({success: function(e){  // display models in collection
			$('li').remove();
			for(var i=0;i<contactCollection.models.length;i++){
				if(contactCollection.models[i].attributes.id == id) {
					var view = new ContactView({model: contactCollection.models[i].attributes});
					$('.contacts').remove();
					view.render();
				}
			}
		}});
	}
});

// *Contact Model*

var ContactModel = Backbone.Model.extend({
  	urlRoot: "/contacts"
});

contactModel = new ContactModel();

// *Conatact Collection*

var ContactCollection = Backbone.Collection.extend({
  	url: "/contacts",
  	model: ContactModel // put models to collection
});

contactCollection = new ContactCollection();

var ContactsList = new ContactView({ collection: contactCollection, el: $("ul") });

//////////////////////////////////////////////////////

// *Contact Form*

var ContactFormView = Backbone.View.extend({
  	events: {
    	"click button.create_contact": "create"
  	},

  	create: function() {
  		console.log('clicked!');
    	var name = this.$el.find('input[name="name"]').val();
    	var age = this.$el.find('input[name="age"]').val();
    	var address = this.$el.find('input[name="address"]').val();
    	var phoneNumber = this.$el.find('input[name="number"]').val();
    	contactCollection.create({ name: name, age: age, address: address, phone_number: number });
    	
  	}
});

var formView = new ContactFormView({ el: $(".form"), collection: contactCollection })

//////////////////////////////////////////////////////

// *ContactView*

// var ContactFormView = Backbone.View.extend({
//   	events: {
//     	"click button.create_contact": "create"
//   	},

//   	create: function() {
//   		console.log('clicked!');
//     	var name = this.$el.find('input[name="name"]').val();
//     	var age = this.$el.find('input[name="age"]').val();
//     	var address = this.$el.find('input[name="address"]').val();
//     	var number = this.$el.find('input[name="number"]').val();
//     	this.contactCollection.create({ name: name, age: age, address: address, number: number });
//   	}
// });

$('button.create_contact').click(function(){
  	console.log('clicked!');
  	var label   = this.parentElement;
  	var name    = $(label).find('input[name="name"]').val();
  	var age     = $(label).find('input[name="age"]').val();
  	var address = $(label).find('input[name="address"]').val();
  	var number  = $(label).find('input[name="number"]').val();

  	$.ajax({url: "/contacts", type: 'POST', data: { name: name, age: age, address: address, number: number }});
  	// contactCollection.create({ name: name, age: age, address: address, number: number });
   	console.log('created');
});

//////////////////////////////////////////////////////

// *Category View*

// var CategoryFormView = Backbone.View.extend({
//   	events: {
//     	"click button.create_category": "create"
//   	},

//   	create: function() {
//   		console.log('clicked!');
//     	var name = this.$el.find('input[name="name"]').val();
//     	this.contactCollection.create({ name: name });
//   	}
// });

$('button.create_category').click(function(){
  	console.log('clicked!');
  	var label   = this.parentElement;
  	var name    = $(label).find('input[name="name"]').val();

  	$.ajax({url: "/category", type: 'POST', data: { name: name }});
  	// contactCollection.create({ name: name, age: age, address: address, number: number });
   	console.log('created');
});





