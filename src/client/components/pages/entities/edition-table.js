/*
 * Copyright (C) 2017  Ben Ockmore
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

import * as bootstrap from 'react-bootstrap';
import * as entityHelper from '../../../helpers/entity';

import Icon from 'react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';


const {
	getEditionReleaseDate, getEntityLabel, getEntityDisambiguation,
	getISBNOfEdition, getEditionFormat
} = entityHelper;
const {Button, Table} = bootstrap;

function EditionTableRow({edition}) {
	const name = getEntityLabel(edition);
	const disambiguation = getEntityDisambiguation(edition);
	const releaseDate = getEditionReleaseDate(edition);
	const isbn = getISBNOfEdition(edition);
	const editionFormat = getEditionFormat(edition);

	return (
		<tr>
			<td>
				<a href={`/edition/${edition.bbid}`}>{name}</a>
				{disambiguation}
			</td>
			<td>{editionFormat}</td>
			<td>
				{
					isbn ?
						<a
							href={`https://isbnsearch.org/isbn/${isbn.value}`}
							rel="noopener noreferrer"
							target="_blank"
						>
							{isbn.value}
						</a> : '?'
				}
			</td>
			<td>
				{releaseDate}
			</td>
		</tr>
	);
}
EditionTableRow.displayName = 'EditionTableRow';
EditionTableRow.propTypes = {
	edition: PropTypes.object.isRequired
};

function EditionTable({entity}) {
	return (
		<div>
			<h2>Editions</h2>
			<Table striped>
				<thead>
					<tr>
						<th>Name</th>
						<th>Format</th>
						<th>ISBN</th>
						<th>Release Date</th>
					</tr>
				</thead>
				<tbody>
					{
						entity.editions.map((edition) => (
							<EditionTableRow
								edition={edition}
								key={edition.bbid}
							/>
						))
					}
				</tbody>
			</Table>
			<Button
				bsStyle="success"
				className="margin-top-d15"
				href={`/edition/create?${
					entity.type.toLowerCase()}=${entity.bbid}`}
			>
				<Icon name="plus"/>
				{'  Add Edition'}
			</Button>
		</div>
	);
}
EditionTable.displayName = 'EditionTable';
EditionTable.propTypes = {
	entity: PropTypes.object.isRequired
};

export default EditionTable;
