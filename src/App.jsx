import React, { useEffect } from 'react';
import ThemeToggle from './components/ThemeToggle.jsx';
import { useSelector } from 'react-redux';

function App() {
  // const isDarkMode = useSelector((state) => state.preferences.darkMode);


  return (
    <div class="min-h-screen bg-gray-950 text-gray-100 font-sans antialiased">
      <header class="bg-gray-900/70 backdrop-blur-md border-b border-gray-800 p-4 flex items-center justify-between z-10 sticky top-0">
        <div class="flex items-center space-x-3">
          <svg class="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">...</svg> <h1 class="text-2xl font-bold text-gray-50 tracking-wider">Quantum Stream</h1>
        </div>
        <div class="relative w-1/3">
          <input type="text" placeholder="Search content..." class="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-500" />
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">...</svg> </div>
        <div class="flex items-center space-x-4">
          <ThemeToggle /> <div class="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-sm font-semibold">JD</div>
        </div>
      </header>

      <div class="flex">
        <aside class="w-64 bg-gray-900/70 backdrop-blur-md border-r border-gray-800 p-6 flex flex-col justify-between min-h-[calc(100vh-68px)] sticky top-[68px]">
          <nav>
            <ul>
              <li class="mb-2">
                <a href="#" class="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-blue-400 transition-colors duration-200">
                  <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">...</svg> Dashboard
                </a>
              </li>
              <li class="mb-2">
                <a href="#" class="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-blue-400 transition-colors duration-200">
                  <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">...</svg> News Feed
                </a>
              </li>
              <li class="mb-2">
                <a href="#" class="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-blue-400 transition-colors duration-200">
                  <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">...</svg> Recommendations
                </a>
              </li>
              <li class="mb-2">
                <a href="#" class="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-blue-400 transition-colors duration-200">
                  <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">...</svg> Social Stream
                </a>
              </li>
              <li class="mb-2">
                <a href="#" class="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-blue-400 transition-colors duration-200">
                  <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">...</svg> Favorites
                </a>
              </li>
            </ul>
          </nav>
          <div>
            <a href="#" class="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-blue-400 transition-colors duration-200">
              <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">...</svg> Settings
            </a>
          </div>
        </aside>

        <main class="flex-1 p-8 overflow-y-auto">
          <section class="mb-8">
            <h2 class="text-3xl font-bold text-blue-400 mb-6 border-b border-blue-600/30 pb-2">Trending News</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div class="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 group">
                <img src="https://via.placeholder.com/400x200?text=News+Image" alt="News Title" class="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div class="p-4">
                  <h3 class="text-xl font-semibold text-gray-50 mb-2">Futuristic AI Breakthrough Unveiled</h3>
                  <p class="text-gray-400 text-sm mb-3 line-clamp-3">Scientists have announced a revolutionary AI model capable of predicting quantum states with unprecedented accuracy, promising new frontiers in computing and material science.</p>
                  <div class="flex justify-between items-center text-xs text-gray-500">
                    <span>Source: TechPulse</span>
                    <span>2 hours ago</span>
                  </div>
                  <button class="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300">Read Article</button>
                </div>
              </div>
            </div>
          </section>

          <section class="mb-8">
            <h2 class="text-3xl font-bold text-purple-400 mb-6 border-b border-purple-600/30 pb-2">Your Quantum Recommendations</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div class="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 group">
                <img src="https://via.placeholder.com/300x400?text=Movie+Poster" alt="Movie Title" class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div class="p-3">
                  <h3 class="text-lg font-semibold text-gray-50 mb-1">Cybernetic Dawn (2025)</h3>
                  <p class="text-gray-400 text-sm">Action, Sci-Fi</p>
                  <div class="flex items-center mt-2">
                    <span class="text-yellow-400 mr-1">★</span>
                    <span class="text-gray-300 text-sm">8.7</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="mb-8">
            <h2 class="text-3xl font-bold text-lime-400 mb-6 border-b border-lime-600/30 pb-2">Social Pulse</h2>
            <div class="space-y-4">
              <div class="bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-700 hover:border-lime-500 transition-all duration-300">
                <div class="flex items-center mb-3">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-br from-lime-500 to-green-500 mr-3 flex items-center justify-center text-sm font-semibold">AI</div>
                  <div>
                    <p class="text-gray-50 font-semibold">@Aether_Innovator</p>
                    <p class="text-gray-400 text-xs">15 mins ago</p>
                  </div>
                </div>
                <p class="text-gray-300 mb-3">Just witnessed a live demo of neural network self-optimization. The future is here, and it's learning at an exponential rate! #AI #FutureTech</p>
                <div class="flex space-x-4 text-gray-500 text-sm">
                  <button class="flex items-center hover:text-lime-400"><svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">...</svg> 120 Likes</button>
                  <button class="flex items-center hover:text-lime-400"><svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">...</svg> 35 Comments</button>
                </div>
              </div>
            </div>
          </section>

          <section class="mb-8">
            <h2 class="text-3xl font-bold text-fuchsia-400 mb-6 border-b border-fuchsia-600/30 pb-2">Dashboard Settings</h2>
            <div class="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
              {/* <SettingsPanel /> */}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}

export default App;