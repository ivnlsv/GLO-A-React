import React,{ Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{ name: 'John C.', salary: 800, increase: true, like: true, id: 1 },
				{ name: 'Alex G.', salary: 900, increase: true, like: false, id: 2 },
				{ name: 'Peter F.', salary: 1000, increase: false, like: false, id: 3 },
			],
			term: '',
			filter: 'all'
		};
		this.maxId = 4;
	}
	deleteItem = (id) => {
		this.setState(({ data }) => {
			return {
				data: data.filter((item) => item.id !== id),
			};
		});
	};
	addItem = (name, salary) => {
		const newItem = {
			name: name,
			salary: salary,
			increase: false,
			like: false,
			id: this.maxId++,
		};
		this.setState(({ data }) => ({
			data: [...data, newItem],
		}));
	};
	onToggleProp = (id, prop) => {
		this.setState(({ data }) => ({
			data: data.map((item) => {
				if (item.id === id) {
					return { ...item, [prop]: !item[prop] };
				}
				return item;
			}),
		}));
	};
	
	searchEmp = (items, term) => { 
		if (term.lenght === 0) { 
			return items;
		}
		return items.filter(item => { 
			return item.name.indexOf(term) > -1
		})
	}
	onUpdateSearch = (term) => { 
		this.setState({ term });
	}
	filterPost = (items, filter) => { 
		switch (filter) { 
			case 'like':
				return items.filter(item => item.like);
			case 'moreThen1000':
				return items.filter(item => item.salary > 1000);
			default: 
				return items
		} 
	}
	onFilterSelect = (filter) => { 
		this.setState({ filter });
	}
	render() {
		const {data, term, filter } = this.state
		const employees = this.state.data.length;
		const increased = this.state.data.filter((item) => item.increase).length;
		const visibleData = this.filterPost(this.searchEmp(data, term), filter);

		return (
			<div className='app'>
				<AppInfo employees={employees} increased={increased} />

				<div className='search-panel'>
					<SearchPanel onUpdateSearch={this.onUpdateSearch} />
					<AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
				</div>

				<EmployeesList
					data={visibleData}
					onDelete={this.deleteItem}
					onToggleProp={this.onToggleProp}
					
				/>
				<EmployeesAddForm onAddItem={this.addItem} />
			</div>
		);
	}
}

export default App;
