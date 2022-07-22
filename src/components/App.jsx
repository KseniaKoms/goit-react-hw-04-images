import { Component } from 'react';
import Searchbar from './Searchbar';
import styles from './App.module.css';
import { ToastContainer } from 'react-toastify';
import ImageGallery from './ImageGallery';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    searchValue: '',
    page: 1,
  };

  handleSubmit = searchValue => {
    this.setState({ searchValue, page: 1 });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  render() {
    return (
      <div className={styles.app}>
        <Searchbar onSubmit={this.handleSubmit} page={this.state.page} />
        <ImageGallery
          searchValue={this.state.searchValue}
          page={this.state.page}
          showMore={this.loadMore}
        />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
