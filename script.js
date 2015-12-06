/** @jsx React.DOM */

var TodoList3 = React.createClass({
    render: function () {
        var _this = this;
        var createItem = function (item, index) {
            return (
                <div style={{
                        position:'relative',
                        display:'inline-block',
                        borderWidth: '1px',
                        borderColor: '#E6E6E6',
                        borderStyle: 'solid',
                        margin: '10px',
                        }}>
                    <img src={item.pictureUrl || 'https://i.imgur.com/99i4eeF.png'} style={{display: 'inline-block',width: '200px', height: '200px'}}/>
                    <span style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: '0',
                        backgroundColor: 'rgba(232, 232, 232, 0.7)',
                        fontSize: '32px',
                        fontFamily: 'Helvetica Neue',
                        fontWeight: 100,
                        textAlign: 'center',
                    }}>{item.name}</span>
                </div>
            );
        };
        return (
            <div>
                <h1 style={{
                    fontSize: '70px',
                    fontFamily: 'Helvetica Neue',
                    fontWeight: 100,
                    textAlign: 'center',
                    color: '#313131',
                }}>Lost Kote</h1>

                <div>{ this.props.items.filter(function(item) {
                    return item.lost;
                }).map(createItem) }</div>
            </div>
        );
    }
});

var TodoApp3 = React.createClass({
    mixins: [ReactFireMixin],

    getInitialState: function () {
        return {
            items: [],
            text: ''
        };
    },

    componentWillMount: function () {
        var firebaseRef = new Firebase('https://kote.firebaseio.com/animals/');
        this.bindAsArray(firebaseRef.limitToLast(25), 'items');
    },

    onChange: function (e) {
        this.setState({text: e.target.value});
    },

    removeItem: function (key) {
        var firebaseRef = new Firebase('https://kote.firebaseio.com/animals/');
        firebaseRef.child(key).remove();
    },

    handleSubmit: function (e) {
        e.preventDefault();
        if (this.state.text && this.state.text.trim().length !== 0) {
            this.firebaseRefs['items'].push({
                text: this.state.text
            });
            this.setState({
                text: ''
            });
        }
    },

    render: function () {
        return (
            <div>
                <TodoList3 items={ this.state.items }/>
            </div>
        );
    }
});

React.render(<TodoApp3 />, document.getElementById('container'));