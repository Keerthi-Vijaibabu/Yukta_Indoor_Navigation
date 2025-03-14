from flask import Flask, request, jsonify
import networkx as nx
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Load CSV files
rooms = pd.read_csv("rooms.csv")
facilities = pd.read_csv("facilities.csv")
connections = pd.read_csv("connections.csv")

# Create a graph
G = nx.Graph()

# Add nodes with positions
for _, row in rooms.iterrows():
    G.add_node(str(row['room_id']), name=row['name'], floor = row['floor'], pos=(row['x'], row['y']))

for _, row in facilities.iterrows():
    G.add_node(row['facility_id'], name=row['name'], floor = row['floor'], pos=(row['x'], row['y']))

# Add edges
for _, row in connections.iterrows():
    G.add_edge(str(row['from']), str(row['to']))

@app.route('/getPath', methods=['GET'])
def get_path():
    src = request.args.get('src')
    dest = request.args.get('dest')

    try:
        print(G.nodes(data=True))  # Print all nodes and their attributes

        path = nx.shortest_path(G, source=src, target=dest)
        path_coords = [G.nodes[node]['pos'] for node in path]  # Extract coordinates
        return jsonify({'path': path_coords})
    except nx.NetworkXNoPath:
        return jsonify({'error': 'No path found'}), 400
    except nx.NodeNotFound:
        return jsonify({'error': 'Invalid room ID'}), 400

if __name__ == '__main__':
    app.run(debug=True)
