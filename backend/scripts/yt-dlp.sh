#!/bin/bash

set -e

echo "🔧 Updating system..."
sudo apt update && sudo apt upgrade -y

echo "📦 Installing dependencies..."
sudo apt install -y python3-pip ffmpeg curl

echo "⬇️ Installing yt-dlp..."
sudo pip3 install -U yt-dlp

echo "✅ Verifying yt-dlp..."
yt-dlp --version

echo "🎉 yt-dlp installed successfully!"