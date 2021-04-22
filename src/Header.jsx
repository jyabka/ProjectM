import React from 'react'

export default ({level}) => {
	return (
		<div className="strip">
			<h1>
				<span
					className={`title title-${level}`}
					>
				ReduxReactRPG
				</span>
			</h1>
		</div>
	);
};