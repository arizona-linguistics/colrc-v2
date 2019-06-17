import React, { Component } from 'react';
import {
    Accordion,
	Icon,
} from 'semantic-ui-react';

class Mission extends Component {
	state = { activeIndex: 0 }

	  handleClick = (e, titleProps) => {
	    const { index } = titleProps
	    const { activeIndex } = this.state
	    const newIndex = activeIndex === index ? -1 : index

	    this.setState({ activeIndex: newIndex })
	  }

    render() {
    const { activeIndex } = this.state

	const MissionStatement = () => (

    <Accordion fluid styled>
		<Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
			<Icon name='dropdown' />
			Mission Statement:  Introduction
		</Accordion.Title>
		<Accordion.Content active={activeIndex === 0}>
			<p>The Coeur d'Alene Online Language Resource Center (COLRC) aims to provide digital Coeur d'Alene language resources to the Coeur d'Alene community and others following best practices for digital language resources (e.g. Chang 2010). The site is located at a server provided by Purdue University Fort Wayne. The COLRC team is committed to long term stability of the website and resources (see Long Term Planning below). The site is maintained by a team of volunteers which include students, linguists, and community members who have been funded in part by NSF BSC-1160627, NSF BSC-1160394 and NEH PD-261031-18. Comments on the site are welcome: please use the 'Contact' link to provide your feedback.
			</p>
		</Accordion.Content>
		<Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
			<Icon name='dropdown' />
			Designated Community
		</Accordion.Title>
		<Accordion.Content active={activeIndex === 1}>
			<p>The primary target for resources within the COLRC is the Coeur d'Alene community. In addition, linguists and the wider scholarly community will find resources in the COLRC of interest.
			</p>
		</Accordion.Content>
		<Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
			<Icon name='dropdown' />
			Ongoing Relationship
		</Accordion.Title>
		<Accordion.Content active={activeIndex === 2}>
			<p>Since its inception, the COLRC team has worked closely with the Coeur d'Alene Tribal Linguist and members of the Coeur d'Alene Language Programs in the development of the COLRC. Members of the community have actively participated in the construction of the COLRC and continue to inform its content, function, and design as members of the COLRC team. The COLRC team also includes, and has worked to include, the participation of leading scholars of the Coeur d'Alene language in the development of the COLRC and will continue to do so.
			</p>
		</Accordion.Content>
		<Accordion.Title active={activeIndex === 3} index={3} onClick={this.handleClick}>
			<Icon name='dropdown' />
			Access
		</Accordion.Title>
		<Accordion.Content active={activeIndex === 3}>
			<h4>Discoverability</h4> 
			<p>The COLRC is listed with the LinguistList, ILAT, the Three Rivers Language Center, and other relevant groups. It is also searchable via metadata online.</p>
			<h4>Fixed Identifiers</h4> 
			<p>Wherever possible, resources in the COLRC are listed in the metadata with fixed identifiers such as ISBN numbers, DOI numbers, and assigned identifiers such as those of Reichard for her unpublished field notes and typed manuscripts.</p>
			<h4>Reach</h4>
			<p> All materials found within the COLRC have been given to the Coeur d'Alene Language Programs office for use on DVD, USB devices, and hard drives in their offices. The materials will remain online in various formats such as PDF, PNG, HTML, and wave files for ease of access and portability. PDF and PNG formats will allow users to obtain digital copies of material and to create analog copies on demand. In the future it is the goal of the COLRC team to have the materials on the community's Tribal server. The community has broadband service throughout its borders which makes access to the online materials possible for most, if not all, community members living on the reservation. In addition, internal COLRC search mechanisms have been developed for the COLRC. There are no fees for access to the COLRC resources.</p>
			<h4>Access and Use Restrictions</h4>
			<p> There are no restrictions on access to the COLRC resources except as apply to those resources that are used by permission and under copyright. This is subject to change should issues arise that warrant restriction such as the depositing of sensitive cultural material or material deemed necessary of restriction. In such cases the issue of management will be dealt with on a case-by-case basis in accord with best practices and input from the Coeur d'Alene Language Programs.</p>
			<h4>Copyright and Transfer of Ownership</h4>
			<p>All materials in the COLRC are in the public domain or used by permission. All the material in the COLRC is available via a number of other resources either for a fee or for free (e.g. libraries, traditional archives, the Internet Archive). Ownership of items in the COLRC remains with the owner of the physical documents or physical resources (e.g. recordings) deposited in the COLRC. See metadata for individual items regarding copyright, information regarding ownership, and permanent locater information (e.g. ISBN, DOI, physical archive locations, or permanent URLs). Use of resources in the COLRC is restricted to the copyright of individual resources.</p>
			<h4>Access Restrictions</h4> 
			<p>There are no restrictions on access to resources in the COLRC. It is the goal of the COLRC team to safeguard the interests and sensitivities of the Coeur d'Alene community. Should the need for restrictions be discovered, the COLRC team will implement the relevant policy following best practices in consultation with the Coeur d'Alene Language Program on a case-by-case basis.</p>
			<h4>Conditions of Use</h4>
			<p> The COLRC team prohibits commercial or for-profit use of collected materials in the COLRC. The COLRC team is committed to prosecute for the improper use of resources. The COLRC is an educational tool and is meant to be used for educational purposes only.</p>
		</Accordion.Content>
		<Accordion.Title active={activeIndex === 4} index={4} onClick={this.handleClick}>
			<Icon name='dropdown' />
			Preservation
		</Accordion.Title>
		<Accordion.Content active={activeIndex === 4}>
			<h4>Long Term Planning</h4>
			<p> The COLRC team endeavor to ensure the longevity of the COLRC as an online resource and the long-term maintenance of the digital resources accessible via the COLRC. The COLRC team is committed to yearly evaluations of the COLRC with regards to technological developments, evaluation of changes in the needs and concerns of the Coeur d'Alene community, and necessary changes to the COLRC and its management. To this end, each June until 2018 the COLRC will be evaluated in terms of its resources, community needs, and management by the current COLRC team. In June of 2018 the Mission Statement and Preservation strategies will be re-evaluated and updated as needed. In addition, at that time a committee will be established composed of community members, scholars, and others to manage the COLRC for the longer term. It is also the goal of the COLRC team to turn management of the COLRC to the Coeur d'Alene Language Programs in 2018 or shortly thereafter.
			</p>
			<h4>Preservation Strategies</h4>
			<p> In June 2012 all web pages developed in 2009 were updated to HTML4. Obsolescent formatting (e.g. frames) were replaced with appropriate, and standard, formats. This process of updating hardware, software, and markup will continue as needed. The annual June evaluation of the COLRC will include recommendations regarding the refreshing of data and data migration. All original files will be preserved in the format that they were first deposited into the COLRC to demonstrate integrity and authenticity. In addition, the materials accessible via the COLRC will continue to be backed up each June as new storage technology is developed and older storage technology (e.g. DVD, USB) becomes obsolete. Resources and data will be updated, altered, or otherwise changed for preservation on a case-by-case basis.
			</p>
			<h4>Authenticity</h4>
			<p>The COLRC team strive to ensure metadata match the resources in the COLRC by regularly (each June) evaluating metadata and the match with COLRC resources. In addition, by documenting origins and all changes to materials and metadata, the depositors are ultimately responsible for vouching for the authenticity of the resources at the COLRC.
			</p>
		</Accordion.Content>
		<Accordion.Title active={activeIndex === 5} index={5} onClick={this.handleClick}>
			<Icon name='dropdown' />
			Infrastructure
		</Accordion.Title>
		<Accordion.Content active={activeIndex === 5}>
			<p>The data accessible via the COLRC website is stored in a database independent of the webpages. The data is stored in a master directly on hard drives on computers at the University of Arizona, Indiana-Purdue Fort Wayne, and at the Coeur d'Alene Language Programs office in Plummer ID. In addition, copies of the directory are stored on servers at the University of Puerto Rico Mayaguez, Indiana-Purdue Fort Wayne, and the University of Arizona. Additionally, copies of the directory are stored on external storage devises (e.g. USB, CD) at the offices of the Coeur d'Alene Language Programs, Indiana-Purdue Fort Wayne, and the University of Arizona. The directory is regularly backed up on the server at Indiana-Purdue and by volunteers at Indiana-Purdue and the University of Arizona each June on available hard drives, USB devices, and CD. These copies are stored in temperature, humidity, and pest controlled areas that are secured to ensure no misuse or theft of copies stored at the primary locations, Indiana-Purdue University, the University of Arizona, and the Coeur d'Alene Language Programs.
			</p>
		</Accordion.Content>
		<Accordion.Title active={activeIndex === 6} index={6} onClick={this.handleClick}>
			<Icon name='dropdown' />
			Financial Sustainability
		</Accordion.Title>
		<Accordion.Content active={activeIndex === 6}>
			<p>The COLRC and its resources are managed by a team of volunteers and the resources to manage the COLRC are provided free by the University of Puerto Rico Mayaguez, Indiana-Purdue Fort Wayne, and the University of Arizona. However, access to these resources could be limited or revoked in the long term. Therefore, the COLRC team is working to establish a permanent long term home for the resources within the existing Coeur d'Alene Language Programs by 2018 with a financial plan that ensures the longevity of the COLRC and its maintenance. In addition, the COLRC team is working to locate a permanent long term second home, or mirror site, for the resources by 2018 that provides a financial commitment to maintain the resources for the long term. The COLRC team will continue to apply to granting agency for funding whenever possible for the updating of resources as in 2012's NSF BSC-1160627 and NSF BSC-1160394 awards to update the COLRC in accord with best practices including an updating of all web pages to HTML4.
			</p>
		</Accordion.Content>
		<Accordion.Title active={activeIndex === 7} index={7} onClick={this.handleClick}>
			<Icon name='dropdown' />
			Disaster Preparedness
		</Accordion.Title>
		<Accordion.Content active={activeIndex === 7}>
			<p>The data and resources that allow for the COLRC to be accessed via the web are stored in four locations several thousand miles apart in geographically diverse locations. The data and resources are stored on three servers in three of the locations, on six separate hard drives, on CD, and USB devices in three of the locations. At each of the four locations the data and resources are regularly backed up (minimally each June). If disaster should strike one of the locations, resources from one of the other three locations will be used to restore the site. The COLRC can be accessed on desktop and laptop computers without connection to the internet provided the directory storing data is stored on the individual hard-drive. Should the server in Puerto Rico be disabled for an extended period of time the directory stored in the Coeur d'Alene Language Program's office on various devices can be downloaded to individual computers for use by community members on the reservation.
			</p>
		</Accordion.Content>
		<Accordion.Title active={activeIndex === 8} index={8} onClick={this.handleClick}>
			<Icon name='dropdown' />
			Succession Plan
		</Accordion.Title>
		<Accordion.Content active={activeIndex === 8}>
			<p>All resources in the COLRC are located at various other locations (e.g. libraries, traditional archives, the Internet Archive). Should the COLRC cease to exist, the materials would still potentially be available, although perhaps difficult to locate and obtain access to. The COLRC team intend to maintain the COLRC minimally, provided adequate resources can be obtained (e.g. server space) for the foreseeable future (i.e. the next 20 years). In addition, in 2018 the COLRC team hopes to turn over the COLRC to the Coeur d'Alene Language Programs to be permanently maintained. The current COLRC site and resources would then continue to be maintained by the COLRC team in conjunction with the Coeur d'Alene Language Programs and serve as a mirror site.
			</p>
		</Accordion.Content>
		<Accordion.Title active={activeIndex === 9} index={9} onClick={this.handleClick}>
			<Icon name='dropdown' />
			Submission
		</Accordion.Title>
		<Accordion.Content active={activeIndex === 9}>
			<p>ATo contribute to the COLRC please use the 'Contact' link. We will consider all requests related directly to the Coeur d'Alene language and culture. At this time we are unable to consider any other resources.
			</p>
		</Accordion.Content>
	</Accordion>
	);
	
      return (     
	  	<div className='ui content'>
			<MissionStatement />
		</div>
	);
  }
}

export default Mission;
